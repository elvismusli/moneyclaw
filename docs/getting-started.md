# Getting Started

MoneyClaw is the payment layer for OpenClaw agents.

It gives an agent:

- a prepaid wallet
- a virtual card
- a dedicated OTP and 3DS inbox
- queryable transaction history

## Basic Flow

1. Create a MoneyClaw API key.
2. Install the skill with `clawhub install moneyclaw`.
3. Store the key as `MONEYCLAW_API_KEY`.
4. Start a fresh OpenClaw session.
5. Ask the agent to inspect the account before its first purchase.

## First Prompt

```text
Check my MoneyClaw account, show wallet balance vs card balance, and tell me if it is ready for a purchase.
```

## Public Surfaces

- product site: `https://moneyclaw.ai`
- OpenClaw quickstart: `https://moneyclaw.ai/openclaw`
- API base: `https://moneyclaw.ai/api`

## What To Read Next

- [OpenClaw Quickstart](./openclaw-quickstart.md)
- [Security Model](./security-model.md)
- [API Overview](./api-overview.md)
