---
layout: home

hero:
  name: MoneyClaw
  text: Payments your OpenClaw agent can actually use.
  tagline: Give your agent a prepaid wallet, a virtual card, a dedicated OTP and 3DS inbox, and a clear audit trail for real checkout.
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
  - title: Prepaid by default
    details: Bound spend with separate wallet and card balances, so agent payments stay easier to inspect and control.
  - title: Built for real checkout
    details: Issue a card, top it up, complete browser checkout, then verify the final transaction result.
  - title: OTP and 3DS inbox
    details: Let the agent fetch verification codes from a dedicated inbox instead of relying on human screenshots or guesswork.
  - title: User-controlled autonomy
    details: Run MoneyClaw in approval-based or pre-authorized mode depending on how much control you want to keep.
  - title: OpenClaw skill included
    details: The public skill bundle and reference files are published in this repo so people can inspect exactly what the agent sees.
  - title: Merchant path too
    details: Hosted invoices and merchant flows are supported too, but buyer-side checkout stays the main public entrypoint.
---

## What You Can Do Today

MoneyClaw is the layer that lets the loop continue:

- check account readiness
- issue a card
- top up prepaid funds
- complete checkout
- fetch OTP or 3DS codes
- verify the final transaction state

## Built For Safe Agent Payments

- prepaid balances keep risk bounded
- wallet and card history stay separate
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
