---
layout: home

hero:
  name: MoneyClaw
  text: Payments your OpenClaw agent can actually execute safely.
  tagline: Give your agent a prepaid wallet, auditable payment tasks, hidden merchant-bound subscription cards, and a dedicated OTP and 3DS inbox.
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
  - title: Hidden subscription cards
    details: Recurring subscriptions can run on persistent merchant-bound cards without turning the card into the product object.
  - title: OTP and 3DS inbox
    details: Let the agent fetch verification codes from a dedicated inbox instead of relying on human screenshots or guesswork.
  - title: User-controlled autonomy
    details: Run MoneyClaw in approval-based or pre-authorized mode depending on how much control you want to keep.
  - title: Merchant path too
    details: Hosted invoices and merchant flows are supported too, but buyer-side checkout stays the main public entrypoint.
  - title: OpenClaw skill included
    details: The public skill bundle and reference files are published in this repo so people can inspect exactly what the agent sees.
---

## What You Can Do Today

MoneyClaw is the layer that lets the loop continue:

- check account readiness
- create a payment task
- create a subscription for recurring spend
- prepare a hidden subscription card when the recurring flow needs one
- complete checkout
- fetch OTP or 3DS codes
- verify the final transaction state

## Built For Safe Agent Payments

- prepaid balances keep risk bounded
- wallet, payment-task, and subscription history stay inspectable
- the user chooses approval-based or pre-authorized operation
- OTP and 3DS stay inside the normal verification flow
- transaction history stays queryable before retries

## Read In This Order

1. [Getting Started](/getting-started)
2. [OpenClaw Quickstart](/openclaw-quickstart)
3. [Security Model](/security-model)
4. [API Overview](/api-overview)
5. [Skill](/skill)

## Need Merchant Flows?

MoneyClaw also supports hosted invoices, checkout links, and merchant-side automation.

Start with [Merchant Flows](/merchant-flows) when you need the collection side, not just buyer-side checkout.
