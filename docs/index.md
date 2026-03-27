---
layout: home

hero:
  name: MoneyClaw
  text: Payments your OpenClaw agent can actually execute safely.
  tagline: Give your agent a prepaid wallet, bounded payment tasks, an optional auto-approval toggle, and a dedicated verification inbox for user-authorized payment flows.
  image:
    src: /crab.png
    alt: MoneyClaw mascot
  actions:
    - theme: brand
      text: Start here
      link: /getting-started
    - theme: alt
      text: OpenClaw quickstart
      link: /openclaw-quickstart
    - theme: alt
      text: Visit moneyclaw.ai
      link: https://moneyclaw.ai

features:
  - title: Wallet-funded by default
    details: Keep agent payments prepaid and bounded by the wallet balance you deliberately loaded.
  - title: Payment tasks first
    details: Use payment intents as the default execution surface for approval, merchant context, and audit state.
  - title: Verification inbox
    details: Let the agent read a verification message only when the checkout explicitly asks for a code.
  - title: Approval-first control
    details: Keep dashboard approval on by default. Enable account-level agent auto-approval only when you deliberately want your connected agent to keep moving without a second click.
  - title: OpenClaw skill included
    details: The public skill bundle and reference files are published in this repo so people can inspect exactly what the agent sees.
---

## What You Can Do Today

MoneyClaw is the layer that lets the loop continue:

- check account readiness
- create a payment task
- continue an already approved payment step
- retrieve verification messages when the user asks to proceed
- verify the final transaction state

## Built For Safe Agent Payments

- prepaid balances keep risk bounded
- wallet and payment-task history stay inspectable
- dashboard approval is the safe default
- verification stays inside the normal checkout flow
- transaction history stays queryable before retries

## Read In This Order

1. [Getting Started](/getting-started)
2. [OpenClaw Quickstart](/openclaw-quickstart)
3. [Security Model](/security-model)
4. [API Overview](/api-overview)
5. [Skill](/skill)

## Need More Than Buyer Flow?

Start with the buyer flow first. Use the deeper API docs only when you intentionally need advanced recurring or merchant-side behavior.
