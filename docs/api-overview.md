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

Use this first. It returns the current wallet state, mailbox address, compatibility hints, and other readiness data.
Agents should read `mailboxAddress` from this response instead of hardcoding an inbox domain.

### Create a payment task

- `POST /payment-intents`

Creates an auditable buyer-side payment task with approval mode, merchant hints, expected amount, and funding boundaries.

### Create a subscription

- `POST /subscriptions`

Creates a recurring-spend resource from an approved `subscription_setup` intent.

### Prepare a hidden subscription card

- `POST /subscriptions/{subscriptionId}/prepare-card`

Prepares a persistent hidden merchant-bound card when the recurring flow needs execution credentials.

### Fetch intent-scoped credentials

- `GET /payment-intents/{intentId}/credentials`

Returns execution credentials only after the intent reaches `card_ready`.

### Renewal loop

- `GET /subscriptions/due`
- `GET /subscriptions/{subscriptionId}/renewal-preflight`
- `POST /subscriptions/{subscriptionId}/prepare-renewal`
- `POST /subscriptions/{subscriptionId}/reconcile`

Use this sequence for recurring spend on the same persistent hidden card.

### Fetch the latest OTP

- `GET /inbox/latest-otp`

Reads the newest OTP or 3DS code from the agent's inbox.

## Compatibility-Only Card Endpoints

These routes still exist for compatibility and some current one-off checkout paths:

- `POST /cards/issue`
- `POST /cards/{cardId}/topup`
- `GET /cards/{cardId}/sensitive`
- `GET /cards/{cardId}/transactions`

Every legacy `/cards/*` request must include:

```text
X-MoneyClaw-Compatibility-Mode: visible-card
```

Do not lead new integrations with these routes unless the execution path explicitly still depends on direct card credentials.

## Merchant And Invoice Endpoints

Merchant and acquiring flows are available too, but they are a secondary path in public discovery.

Read [Merchant Flows](./merchant-flows.md) for the public overview.
