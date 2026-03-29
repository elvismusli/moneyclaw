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

Use this first. It returns the current wallet state, mailbox address, deposit context, `agentAutoApproveEnabled`, and other readiness data.
Agents should read `mailboxAddress` from this response instead of hardcoding an inbox domain.
On freshly created accounts, this first authenticated read may also finish mailbox, deposit-address, and provider setup automatically, so users and agents should not need a separate setup step before creating a payment task.

### Configure account-level agent approval

- `PATCH /me/agent-approval`

Turns account-level agent auto-approval on or off for API-key-created payment tasks. This control
requires a dashboard user session, not an API key.

### Create a payment task

- `POST /payment-intents`

Creates an auditable buyer-side payment task with merchant hints, expected amount, and funding boundaries. For API-key-created tasks, the account-level `agentAutoApproveEnabled` setting determines whether the task waits for dashboard approval or moves through the auto-approved path.
If a task remains `approved`, inspect the returned `executionBlocker` field before assuming the funding cap is the only problem; it now surfaces blocked card-preparation reasons directly.
For the first hidden-card bootstrap on an account, MoneyClaw may still reserve the fixed provider minimum initial deposit even if the current one-time purchase amount is smaller. Any residual stays on the same hidden execution card for later tasks.

### Fetch intent-scoped credentials

- `GET /payment-intents/{intentId}/credentials`

Returns execution credentials only after the intent reaches `card_ready`.

### Reconcile a one-time payment task

- `POST /payment-intents/{intentId}/reconcile`

Use this after a successful one-time hidden-card checkout to write the settled spend back into MoneyClaw accounting.

### Inspect the latest inbox message

- `GET /inbox/latest`

Reads the newest account email. The inbox is useful for receipts and account state, but it is not the default buyer-side execution path.

## Advanced Endpoints

Recurring subscriptions and merchant-side flows exist too, but they are not the default buyer flow.

Approved `subscription_setup` payment tasks now auto-create the recurring subscription record and
automatically attempt shared hidden-card preparation when wallet funding is ready. Direct subscription
endpoints remain recovery-oriented tools, not the default buyer flow.

Approved `one_time_purchase` and `merchant_invoice` tasks can also auto-attempt
hidden-card preparation when wallet funds are available.

- `POST /subscriptions`
- `POST /subscriptions/{subscriptionId}/prepare-card` (explicit retry path)
- `GET /subscriptions/due`
- `GET /subscriptions/{subscriptionId}/renewal-preflight`
- `POST /subscriptions/{subscriptionId}/prepare-renewal`
- `POST /subscriptions/{subscriptionId}/reconcile`

## Merchant And Invoice Endpoints

Merchant and acquiring flows are available too, but they are a secondary path in public discovery.

Read [Merchant Flows](./merchant-flows.md) for the public overview.
