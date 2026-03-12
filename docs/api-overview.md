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

Use this first. It returns the current wallet state, card state, mailbox address, and other readiness data.

### Issue a card

- `POST /cards/issue`

Creates a prepaid virtual card when the wallet is funded.

### Top up a card

- `POST /cards/{cardId}/topup`

Loads prepaid funds onto the existing card.

### Get card details

- `GET /cards/{cardId}/sensitive`

Returns PAN, CVV, expiry, and billing address for the active checkout flow.

### Check recent transactions

- `GET /cards/{cardId}/transactions?limit=20&offset=0`

Use this to verify what actually happened before retrying a payment.

### Fetch the latest OTP

- `GET /inbox/latest-otp`

Reads the newest OTP or 3DS code from the agent's inbox.

## Merchant And Invoice Endpoints

Merchant and acquiring flows are available too, but they are a secondary path in public discovery.

Read [Merchant Flows](./merchant-flows.md) for the public overview.
