---
name: moneyclaw
description: Inspect a MoneyClaw wallet, create approval-based payment tasks, and continue user-confirmed payment steps using a prepaid account. Use only when the user clearly asks to use MoneyClaw for their own payments.
metadata:
  openclaw:
    homepage: https://moneyclaw.ai/openclaw
    primaryEnv: MONEYCLAW_API_KEY
    requires:
      env:
        - MONEYCLAW_API_KEY
---

# MoneyClaw

MoneyClaw helps OpenClaw agents inspect prepaid payment state, create auditable payment tasks, and continue explicitly requested payment steps with verification-message support when needed.

Primary use case: buyer-side payments for OpenClaw agents.

## Authentication

This skill requires one MoneyClaw API key.

```bash
Authorization: Bearer $MONEYCLAW_API_KEY
```

Base URL: `https://moneyclaw.ai/api`

## Trust Model

MoneyClaw is designed for real, user-authorized agent payments.

- use prepaid balances to keep risk bounded
- use payment intents as the main auditable execution surface
- use the account inbox only when a checkout explicitly asks for a verification code
- let the user approve the payment step before money moves

## Approval Model

Default to approval-based mode.

- In approval-based mode, the agent asks the user before executing payment actions.
- Some accounts may already have a pre-authorized spending scope configured outside the skill. Treat that as an advanced exception, not the default assumption.
- If it is not explicit that this exact scope is already pre-authorized, treat the flow as approval-based.
- Creating an `approval_based` intent is fine with an API key, but approving that pending intent currently requires a human dashboard session rather than API-key-only automation.

## Safety Boundaries

- Only use MoneyClaw for purchases or payment flows explicitly requested by the user. If the scope is not clearly already pre-authorized, stop and ask.
- Only use wallet, card, and billing data returned by the user's own MoneyClaw account.
- Respect merchant, issuer, card-network, and verification controls.
- Treat fraud checks, KYC, sanctions, geography rules, merchant restrictions, issuer declines, and other payment controls as hard boundaries.
- Never fabricate billing identity, cardholder data, addresses, names, phone numbers, or verification information.
- If a transaction fails, looks suspicious, or produces conflicting signals, stop and inspect transaction state before retrying.
- Prefer prepaid, bounded-risk flows by default.
- Never invoke this skill automatically from a shopping, billing, or checkout page. Use it only after an explicit user request to use MoneyClaw.

## Before Any High-Risk Step

Before any action that can spend funds, retrieve execution details, retrieve verification messages, or submit a payment step:

1. Confirm the exact merchant domain.
2. Confirm the amount and currency.
3. Confirm the user explicitly asked for this exact action, or that this exact spending scope is clearly already pre-authorized.
4. Stop if that confirmation is missing or ambiguous.

## Default Buyer Flow

Use the product in this order:

1. `GET /api/me` for wallet readiness, deposit address, and inbox context. Fresh accounts may also finish mailbox, deposit-address, and provider setup on this first authenticated read.
2. `POST /api/payment-intents` with `approval_based` for the exact purchase.
3. Wait for approval or a ready state on that payment task. Approved one-time tasks can auto-prepare a hidden execution card when wallet funding is available and the task cap can cover the selected BIN requirement.
4. Use `GET /api/payment-intents/:intentId/credentials` only when the task is `card_ready` and the user explicitly asked to continue the current payment step.
5. Read `GET /api/inbox/latest-otp` only if the checkout explicitly asks for a verification code and the user asked to proceed.
6. After a successful one-time checkout, use `POST /api/payment-intents/:intentId/reconcile` to write the settled charge back into MoneyClaw accounting.
7. Inspect payment-task state and wallet transactions before retrying.

## Load References When Needed

- Read `references/payment-safety.md` before entering payment details on an unfamiliar merchant, when a checkout keeps failing, or when verification and retry boundaries matter.

## Core Jobs

### 1. Check account readiness

```bash
curl -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/me
```

Important fields:

- `balance`: wallet balance
- `depositAddress`: where to send USDT
- `mailboxAddress`: inbox address for receipts and verification messages

When the user asks for readiness, report wallet balance, deposit address, inbox state, and whether a payment task can proceed.

### 2. Create an auditable payment task

```bash
curl -X POST -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "intentType": "one_time_purchase",
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

Rules:

- default to `approval_based`
- use `pre_authorized` only when the user explicitly says that this scope is already authorized
- if you only have an API key and the intent is `pending_approval`, stop and ask the user to approve it in the dashboard instead of pretending you can finish approval yourself
- treat the intent as the source of truth for execution state, not the card

### 3. Inspect the payment task state

```bash
curl -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/payment-intents/{intentId}
```

Use the payment task as the source of truth for readiness, approval, execution, and completion.

### 4. Read the payment task history

```bash
curl -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/payment-intents/{intentId}/history
```

Use the history when the user wants an audit trail or when a payment step gave ambiguous results.

### 5. Continue the approved payment step

```bash
curl -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/payment-intents/{intentId}/credentials
```

Rules:

- only call this when the intent is `card_ready`
- only call this after the user explicitly asked to continue that payment step
- do not treat these execution details as a general account-level card surface
- do not expose PAN or CVV longer than needed for the active checkout

### 6. Read the latest verification message only when needed

```bash
curl -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/inbox/latest-otp
```

Rules:

- use this only when the checkout explicitly asks for a verification code
- never guess or fabricate a code
- if the mailbox, merchant, and task state conflict, stop and inspect before retrying

## Payment Execution Rules

- The spending model is prepaid. The loaded balance is the hard limit.
- Before payment, confirm the merchant domain and total amount are correct.
- Use the billing address returned by MoneyClaw. Never invent one.
- Wait for the verification message instead of guessing codes.
- Do not retry the same merchant checkout more than twice in one session without user confirmation or clear pre-authorization.
- If the user asks for a risky or suspicious payment, stop and explain why.

Use `references/payment-safety.md` for expanded safety, verification, and retry guidance.

## Good Default Prompt Shapes

- `Check my MoneyClaw account and tell me if the wallet, inbox, and payment tasks are ready.`
- `Create an approval-based payment task for this purchase and keep the amount bounded to the expected total.`
- `Continue this already approved payment step, and only read the latest verification message if the checkout asks for a code.`
- `Check whether this payment task completed, still needs approval, or should be inspected before retrying.`
