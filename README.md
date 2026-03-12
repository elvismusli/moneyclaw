<p align="center">
  <img src="./assets/crab.png" alt="MoneyClaw mascot" width="220" />
</p>

<h1 align="center">MoneyClaw</h1>

<p align="center">
  <strong>Real payments for OpenClaw agents.</strong>
</p>

<p align="center">
  Prepaid wallet. Virtual card. OTP and 3DS inbox. Auditable payment flows.
</p>

<p align="center">
  <a href="https://moneyclaw.ai">Website</a>
  ·
  <a href="https://moneyclaw.ai/openclaw">OpenClaw Quickstart</a>
  ·
  <a href="./docs/README.md">Docs</a>
  ·
  <a href="./moneyclaw-skill/SKILL.md">Skill</a>
</p>

<p align="center">
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-f36f3a.svg">
  <img alt="Status" src="https://img.shields.io/badge/status-public%20docs%20%2B%20skill-111111.svg">
  <img alt="OpenClaw" src="https://img.shields.io/badge/built%20for-OpenClaw-ef6a3b.svg">
</p>

## What This Repo Is

This is the public MoneyClaw repository.

It is the place for:

- public product docs
- the MoneyClaw OpenClaw skill
- examples and starter prompts
- high-level architecture and safety model

It is not the full internal product monorepo.

Internal infrastructure, production runbooks, incidents, security hardening notes, deployment details, and provider-specific operational playbooks are intentionally not published here.

## What MoneyClaw Does

MoneyClaw gives OpenClaw agents a real prepaid wallet and virtual card for online purchases.

With MoneyClaw, an agent can:

- check wallet and card readiness
- issue a virtual card
- top up a card with prepaid funds
- complete browser checkout
- fetch OTP or 3DS codes from a dedicated inbox
- verify the final transaction result

Secondary workflows include:

- hosted invoices
- merchant checkout links
- merchant and acquiring flows when explicitly requested

## Quick Start

Install the skill:

```bash
clawhub install moneyclaw
```

Then:

1. Create a MoneyClaw API key.
2. Store it in OpenClaw as `MONEYCLAW_API_KEY`.
3. Start a fresh OpenClaw session.
4. Ask the agent to inspect the account before its first purchase.

Starter prompt:

```text
Check my MoneyClaw account, show wallet balance vs card balance, and tell me if it is ready for a purchase.
```

## Safety Model

MoneyClaw is built around bounded, inspectable agent payments.

- prepaid balances keep risk capped
- wallet and card history stay separate
- OTP and 3DS verification flows use a dedicated inbox
- the user can operate in approval-based or pre-authorized mode

Important boundary:

MoneyClaw is for user-authorized payments. It is not designed to bypass issuer, merchant, fraud, KYC, sanctions, geography, or verification controls.

Read the full model in [docs/security-model.md](./docs/security-model.md).

## Reading Order

Start here:

1. [docs/getting-started.md](./docs/getting-started.md)
2. [docs/openclaw-quickstart.md](./docs/openclaw-quickstart.md)
3. [docs/api-overview.md](./docs/api-overview.md)
4. [moneyclaw-skill/SKILL.md](./moneyclaw-skill/SKILL.md)

## Repo Map

```text
assets/            branding and repo visuals
docs/              public documentation
examples/          prompts and curl examples
moneyclaw-skill/   public OpenClaw skill files
```

## Scope Of This Public Repo

Published here:

- what MoneyClaw is
- how to use it
- how the public skill is structured
- how the public API is meant to be understood
- how the safety and trust model works

Not published here:

- production IPs and infra
- internal incidents and postmortems
- operational security notes
- private merchant-specific tactics
- internal team process and private agent instructions

## Support

- Product site: [moneyclaw.ai](https://moneyclaw.ai)
- Docs hub: [docs/README.md](./docs/README.md)
- Security contact: [SECURITY.md](./SECURITY.md)

## License

Code and docs in this repository are available under the [MIT License](./LICENSE), unless noted otherwise.
