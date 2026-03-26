---
name: moneyclaw
description: Inspect a MoneyClaw wallet, create approval-based payment tasks, and assist with user-confirmed subscription or checkout steps using a prepaid account. Use only when the user clearly asks to use MoneyClaw for their own payments.
---

# MoneyClaw

MoneyClaw helps OpenClaw agents inspect prepaid payment state, create auditable payment tasks, and continue explicitly requested subscription or checkout steps with verification-message support and hidden subscription cards for recurring spend.

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

## Approval Model

Default to approval-based mode.

- In approval-based mode, the agent asks the user before executing payment actions.
- Some accounts may already have a pre-authorized spending scope configured outside the skill. Treat that as an advanced exception, not the default assumption.
- If it is not explicit that this exact scope is already pre-authorized, treat the flow as approval-based.
- Creating an `approval_based` intent is fine with an API key, but approving that pending intent currently requires a human dashboard session rather than API-key-only automation.

## Safety Boundaries

- Only use MoneyClaw for purchases or payment flows explicitly requested by the user. If the scope is not clearly already pre-authorized, stop and ask.
- Only use wallet, card, and billing data returned by the user's own MoneyClaw account.
- Respect merchant, issuer, card-network, and verification controls, including OTP and 3DS steps.
- Treat fraud checks, KYC, sanctions, geography rules, merchant restrictions, issuer declines, and other payment controls as hard boundaries.
- Never fabricate billing identity, cardholder data, addresses, names, phone numbers, or verification information.
- If a transaction fails, looks suspicious, or produces conflicting signals, stop and inspect transaction state before retrying.
- Prefer prepaid, bounded-risk flows by default.
- Only use invoice, merchant, acquiring, or hosted payment-link flows when the user explicitly asks for them.
- Never invoke this skill automatically from a shopping, billing, or checkout page. Use it only after an explicit user request to use MoneyClaw.

## Before Any High-Risk Step

Before any action that can spend funds, retrieve execution details, retrieve verification messages, or submit a payment step:

1. Confirm the exact merchant domain.
2. Confirm the amount and currency.
3. Confirm the user explicitly asked for this exact action, or that this exact spending scope is clearly already pre-authorized.
4. Stop if that confirmation is missing or ambiguous.

## Current Execution Model

Use the product in this order:

1. `GET /api/me` for wallet readiness, deposit address, and inbox context.
2. Prefer `payment_intents` and `subscriptions` for auditable or recurring flows.
3. Use `GET /api/payment-intents/:intentId/credentials` only when an intent is `card_ready` and the user explicitly asked to continue the current checkout or subscription step.

Important details:

- hidden subscription cards do not appear in normal `GET /api/me`
- subscription cards are persistent, merchant-bound, and stay active while the subscription stays active
- funding should stay bounded: reuse residual allocation first, then top up only the delta you need
- cards are internal execution artifacts, not a normal account-level API surface

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

When the user asks for readiness, report wallet balance, deposit address, inbox state, and whether payment tasks or subscriptions can proceed.

### 2. Create an auditable payment task

```bash
curl -X POST -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "intentType": "subscription_setup",
    "approvalMode": "approval_based",
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

- default to `approval_based`
- use `pre_authorized` only when the user explicitly says that this scope is already authorized
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
- execution details are then fetched through the setup intent

Get the intent-scoped execution details:

```bash
curl -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/payment-intents/{intentId}/credentials
```

Rules:

- only call this when the intent is `card_ready`
- only call this after the user explicitly asked to continue that checkout or subscription step
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
- `Create an approval-based payment task for this purchase and keep the amount bounded to the expected total.`
- `Inspect this due subscription, explain whether it needs approval or renewal prep, and only continue if the user confirms the next step.`
- `Continue this already approved checkout, and if 3DS appears, retrieve the latest verification message from MoneyClaw inbox and verify the final result.`

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
- merchant or acquiring flows when the user explicitly wants to accept payments

Lead with the first two for buyer-side execution.
