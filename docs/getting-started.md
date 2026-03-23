# Getting Started

MoneyClaw is the payment layer for OpenClaw agents.

It gives an agent:

- a prepaid wallet
- payment tasks
- recurring subscriptions
- a dedicated OTP and 3DS inbox
- queryable transaction history

## What You Need

- a MoneyClaw account
- an API key
- OpenClaw with the `moneyclaw` skill installed

## Five Minute Path

1. Create a MoneyClaw API key.
2. Install the skill with `clawhub install moneyclaw`.
3. Store the key as `MONEYCLAW_API_KEY`.
4. Start a fresh OpenClaw session.
5. Ask the agent to inspect the account before its first purchase.

## First Prompt

```text
Check my MoneyClaw account and tell me if the wallet, inbox, and payment tasks are ready.
```

## Execution Model

- use payment tasks as the default buyer-side object
- use subscriptions for recurring spend
- treat hidden execution cards as system-managed infrastructure, not as the main user-facing object
- use legacy direct-card routes only when a compatibility checkout still depends on them

## Public Surfaces

- product site: `https://moneyclaw.ai`
- OpenClaw quickstart: `https://moneyclaw.ai/openclaw`
- API base: `https://moneyclaw.ai/api`

## What To Read Next

- [OpenClaw Quickstart](./openclaw-quickstart.md)
- [Security Model](./security-model.md)
- [API Overview](./api-overview.md)
