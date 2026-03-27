# API Overview

Base URL:

```text
https://moneyclaw.ai/api
```

Authentication:

```text
Authorization: Bearer $MONEYCLAW_API_KEY
```

## Core Buyer-Side Endpoints

### Check account

- `GET /me`

Use this first. It returns the current wallet state, mailbox address, deposit context, and other readiness data.
Agents should read `mailboxAddress` from this response instead of hardcoding an inbox domain.

### Create a payment task

- `POST /payment-intents`

Creates an auditable buyer-side payment task with approval mode, merchant hints, expected amount, and funding boundaries.

### Fetch intent-scoped credentials

- `GET /payment-intents/{intentId}/credentials`

Returns execution credentials only after the intent reaches `card_ready`.

### Read the latest verification message

- `GET /inbox/latest-otp`

Reads the newest verification code from the agent's inbox when checkout asks for one.

## Advanced Endpoints

Recurring subscriptions and merchant-side flows exist too, but they are not the default buyer flow.

Approved `subscription_setup` payment tasks now auto-create the recurring subscription record and
automatically attempt hidden-card preparation when wallet funding is ready. Direct subscription
endpoints remain recovery-oriented tools, not the default buyer flow.

- `POST /subscriptions`
- `POST /subscriptions/{subscriptionId}/prepare-card` (explicit retry path)
- `GET /subscriptions/due`
- `GET /subscriptions/{subscriptionId}/renewal-preflight`
- `POST /subscriptions/{subscriptionId}/prepare-renewal`
- `POST /subscriptions/{subscriptionId}/reconcile`

## Merchant And Invoice Endpoints

Merchant and acquiring flows are available too, but they are a secondary path in public discovery.

Read [Merchant Flows](./merchant-flows.md) for the public overview.
