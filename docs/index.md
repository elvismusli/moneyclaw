---
layout: home

hero:
  name: MoneyClaw
  text: Real payments for OpenClaw agents.
  tagline: Prepaid wallet, virtual card, OTP and 3DS inbox, and auditable payment flows.
  image:
    src: /crab.png
    alt: MoneyClaw mascot
  actions:
    - theme: brand
      text: Read the docs
      link: /getting-started
    - theme: alt
      text: OpenClaw quickstart
      link: /openclaw-quickstart
    - theme: alt
      text: View the skill
      link: /skill

features:
  - title: Prepaid by default
    details: Bound spend, separate wallet and card balance, and a clearer risk model for agent payments.
  - title: Built for real checkout
    details: Issue a card, top it up, complete browser checkout, then verify what actually happened.
  - title: OTP and 3DS inbox
    details: Let the agent fetch verification codes from a dedicated inbox instead of relying on human screenshots.
  - title: Public trust model
    details: This repo documents what MoneyClaw does, what it does not do, and the safety boundaries around user-authorized payments.
  - title: OpenClaw skill included
    details: The public skill bundle and reference files are published in this repo so people can inspect exactly what the agent sees.
  - title: Merchant path too
    details: Hosted invoices and acquiring flows are supported, but buyer-side checkout remains the main public narrative.
---

## Why This Exists

Most agent demos stop right before payment.

MoneyClaw is the layer that lets the loop continue:

- check account readiness
- issue a card
- top up prepaid funds
- complete checkout
- fetch OTP or 3DS codes
- verify the final transaction state

## Public Scope

This site is intentionally curated.

Published here:

- product docs
- the public OpenClaw skill
- quickstart and examples
- safety and trust model

Intentionally not published here:

- internal incidents
- ops and deployment runbooks
- infrastructure hardening notes
- private production context

## Start Here

1. [Getting Started](/getting-started)
2. [OpenClaw Quickstart](/openclaw-quickstart)
3. [API Overview](/api-overview)
4. [Security Model](/security-model)
