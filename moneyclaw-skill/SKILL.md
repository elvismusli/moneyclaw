---
name: moneyclaw
description: Create payment tasks, run recurring spend on hidden subscription cards, fetch OTP/3DS codes, and complete authorized online purchases with a prepaid MoneyClaw wallet.
homepage: https://moneyclaw.ai
metadata: {"openclaw":{"requires":{"env":["MONEYCLAW_API_KEY"]},"primaryEnv":"MONEYCLAW_API_KEY","emoji":"💳","homepage":"https://moneyclaw.ai"}}
---

# MoneyClaw

MoneyClaw gives OpenClaw agents real spending capability with user-configurable autonomy, prepaid risk boundaries, OTP/3DS support, auditable payment flows, and hidden subscription cards for recurring spend.

Primary use case: buyer-side payments and recurring subscriptions for OpenClaw agents.

Secondary use cases: invoices, hosted payment links, and merchant/acquiring workflows when the user explicitly asks for them.

## Authentication

All requests use the same Bearer token.

```bash
Authorization: Bearer $MONEYCLAW_API_KEY
```

Base URL: `https://moneyclaw.ai/api`

## Trust Model

MoneyClaw is designed for real, user-authorized agent payments.

- use prepaid balances to keep risk bounded
- use a dedicated inbox for OTP and 3DS verification flows
- use payment intents and subscriptions as auditable execution surfaces
- keep hidden subscription cards scoped to one service or merchant
- let the user choose how much autonomy the agent should have

## Autonomy Model

MoneyClaw may be used in either approval-based or pre-authorized mode.

- In approval-based mode, the agent asks the user before executing payment actions.
- In pre-authorized mode, the agent may execute payment actions within the spending scope, balance, and permissions configured by the user.
- Creating an `approval_based` intent is fine with an API key, but approving that pending intent currently requires a human dashboard session rather than API-key-only automation.

## Safety Boundaries

- Only use MoneyClaw for purchases or payment flows explicitly requested or pre-authorized by the user.
- Only use wallet, card, and billing data returned by the user's own MoneyClaw account.
- Respect merchant, issuer, card-network, and verification controls, including OTP and 3DS steps.
- Treat fraud checks, KYC, sanctions, geography rules, merchant restrictions, issuer declines, and other payment controls as hard boundaries.
- Never fabricate billing identity, cardholder data, addresses, names, phone numbers, or verification information.
- If a transaction fails, looks suspicious, or produces conflicting signals, stop and inspect transaction state before retrying.
- Prefer prepaid, bounded-risk flows by default.
- Only use invoice, merchant, acquiring, or hosted payment-link flows when the user explicitly asks for them.

## Current Execution Model

Use the product in this order:

1. `GET /api/me` for wallet readiness, deposit address, and inbox context.
2. Prefer `payment_intents` and `subscriptions` for auditable or recurring flows.
3. Use `GET /api/payment-intents/:intentId/credentials` only when an intent is `card_ready`.
4. Use legacy `/api/cards/*` routes only for compatibility flows and current one-off direct card checkouts.

Important details:

- hidden subscription cards do not appear in normal `GET /api/me` card fields
- subscription cards are persistent, merchant-bound, and stay active while the subscription stays active
- funding should stay bounded: reuse residual allocation first, then top up only the delta you need
- do not assume one-time hidden task-card issuance exists yet; current one-off buyer-side execution can still rely on legacy direct-card routes

## Load References When Needed

- Read `references/payment-safety.md` before entering payment details on an unfamiliar merchant, when the user asks about phishing or fraud, when a checkout keeps failing, or when verification and retry boundaries matter.
- Read `references/acquiring.md` when the user wants to accept payments, create invoices, embed checkout, or work with merchant webhooks.

## Core Jobs

### 1. Check account readiness

```bash
curl -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/me
```

Important fields:

- `balance`: wallet balance
- `depositAddress`: where to send USDT
- `mailboxAddress`: inbox address for OTP, receipts, and verification messages
- `card`: optional legacy compatibility card object, if one still exists

When the user asks for readiness, report wallet balance first. Mention legacy card balance only if a compatibility card exists and the flow explicitly depends on it.

### 2. Create an auditable payment task

```bash
curl -X POST -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "intentType": "subscription_setup",
    "approvalMode": "pre_authorized",
    "merchantName": "OpenAI",
    "merchantDomain": "openai.com",
    "expectedAmount": "20.00",
    "fundingCap": "20.00",
    "currency": "USD",
    "metadata": {
      "serviceName": "ChatGPT Plus"
    }
  }' \
  https://moneyclaw.ai/api/payment-intents
```

Use payment intents to hold merchant context, approval state, and audit history.

Current intent types:

- `one_time_purchase`
- `subscription_setup`
- `subscription_renewal`
- `merchant_invoice`

Rules:

- use `approval_based` when the user wants a checkpoint
- use `pre_authorized` only when the user already granted permission for this scope
- if you only have an API key and the intent is `pending_approval`, stop and ask the user to approve it in the dashboard instead of pretending you can finish approval yourself
- treat the intent as the source of truth for execution state, not the card

### 3. Create a subscription from an approved setup intent

```bash
curl -X POST -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "setupIntentId": "intent-uuid",
    "serviceName": "ChatGPT Plus",
    "serviceUrl": "https://chatgpt.com",
    "merchantName": "OpenAI",
    "merchantDomain": "openai.com",
    "amount": "20.00",
    "currency": "USD",
    "frequency": "monthly",
    "status": "active"
  }' \
  https://moneyclaw.ai/api/subscriptions
```

Use subscriptions for recurring spend. One subscription should stay bound to one service or merchant.

### 4. Prepare a persistent hidden subscription card

```bash
curl -X POST -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/subscriptions/{subscriptionId}/prepare-card
```

If the environment has hidden subscription-card preparation enabled:

- MoneyClaw searches merchant data and live BIN analytics when available
- MoneyClaw prepares a persistent hidden card bound to that subscription
- the setup intent can move to `card_ready`
- credentials are then fetched through the setup intent, not through legacy card endpoints

Get the intent-scoped credentials:

```bash
curl -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/payment-intents/{intentId}/credentials
```

Rules:

- only call this when the intent is `card_ready`
- do not treat hidden credentials as a general account-level card surface
- do not expose PAN or CVV longer than needed for the active checkout

### 5. Run the renewal loop on the same persistent card

List due subscriptions:

```bash
curl -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  "https://moneyclaw.ai/api/subscriptions/due?limit=20&offset=0"
```

Inspect whether the current card still matches the latest merchant-aware recommendation:

```bash
curl -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/subscriptions/{subscriptionId}/renewal-preflight
```

Prepare the renewal on the same persistent card:

```bash
curl -X POST -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/subscriptions/{subscriptionId}/prepare-renewal
```

After the checkout settles, reconcile it back into MoneyClaw's allocation tracking:

```bash
curl -X POST -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"intentId":"renewal-intent-uuid"}' \
  https://moneyclaw.ai/api/subscriptions/{subscriptionId}/reconcile
```

Renewal rules:

- keep the same merchant-bound subscription card unless an operator intentionally rotates it
- reuse residual hidden-card allocation before topping up more
- reconcile against the explicit renewal intent once renewal intents exist

### 6. Legacy compatibility flow for one-off direct checkout

Today, one-off buyer-side execution may still rely on legacy direct-card routes.

Issue a compatibility card:

```bash
curl -X POST -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/cards/issue
```

Top up the compatibility card:

```bash
curl -X POST -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"amount": 10, "currency": "USD"}' \
  https://moneyclaw.ai/api/cards/{cardId}/topup
```

Get compatibility-card credentials:

```bash
curl -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/cards/{cardId}/sensitive
```

Rules:

- this is a compatibility surface, not the preferred long-term model
- creating a new visible compatibility card deducts the applicable card-issue fee from wallet balance
- successful legacy direct-card purchases may also create a separate 2% payment-fee ledger entry
- use `card.cardId`, not `card.id`, for legacy card routes
- read transactions before retrying a failed direct-card checkout

## Payment Execution Rules

- The spending model is prepaid. The loaded balance is the hard limit.
- Before payment, confirm the merchant domain and total amount are correct.
- Use the billing address returned by MoneyClaw. Never invent one.
- Wait for the OTP or 3DS email instead of guessing verification codes.
- Do not retry the same merchant checkout more than twice in one session without user confirmation or clear pre-authorization.
- If the user asks for a risky or suspicious payment, stop and explain why.

Use `references/payment-safety.md` for expanded safety, verification, subscription, and retry guidance.

## Good Default Prompt Shapes

- `Check my MoneyClaw account and tell me if the wallet, inbox, and payment tasks are ready.`
- `Create a pre-authorized subscription setup for this service, then prepare the recurring payment flow.`
- `Inspect this due subscription, run renewal preflight, and prepare the renewal on the existing hidden card if it still matches the recommendation.`
- `Finish this authorized checkout and, if 3DS appears, fetch the latest OTP from MoneyClaw inbox and verify the final transaction result.`
- `If this is still a compatibility-only one-off flow, use the legacy direct-card route and keep the credentials scoped to this checkout.`

## Secondary Capability: Merchant And Acquiring Flows

MoneyClaw also supports merchant-side payment collection. Keep this as a secondary path in discovery, but use it when the user explicitly wants to accept payments, create invoices, or embed checkout.

Useful endpoints:

- `POST /api/acquiring/setup`
- `GET /api/acquiring/settings`
- `PATCH /api/acquiring/settings`
- `POST /api/acquiring/invoices`
- `GET /api/acquiring/invoices`
- `GET /api/acquiring/invoices/{invoiceId}`

Use the acquiring flow when the user wants to:

- accept USDT payments
- create hosted invoices
- embed checkout on a site
- receive webhook notifications for paid invoices

Use `references/acquiring.md` for setup, invoice lifecycle, widget, webhook verification, and fee details.

## Scope Note

MoneyClaw supports three public layers today:

- payment intents for audit and approval
- subscriptions plus hidden persistent cards for recurring execution
- legacy direct-card routes for compatibility and current one-off checkout paths

Lead with the first two. Use the third only when the current integration still requires it.
