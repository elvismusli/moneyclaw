<p align="center">
  <img src="./assets/crab.png" alt="MoneyClaw mascot" width="220" />
</p>

<h1 align="center">MoneyClaw</h1>

<p align="center">
  <strong>Intent-based payments for OpenClaw agents.</strong>
</p>

<p align="center">
  Prepaid wallet. Payment tasks. Hidden subscription cards. Verification inbox.
</p>

<p align="center">
  <a href="https://moneyclaw.ai">Website</a>
  ·
  <a href="https://elvismusli.github.io/moneyclaw/">Docs Site</a>
  ·
  <a href="https://moneyclaw.ai/openclaw">OpenClaw Quickstart</a>
  ·
  <a href="https://elvismusli.github.io/moneyclaw/getting-started">Docs</a>
  ·
  <a href="https://github.com/elvismusli/moneyclaw/blob/main/moneyclaw-skill/SKILL.md">Skill</a>
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

MoneyClaw gives OpenClaw agents a prepaid wallet and an auditable payment-execution layer for online purchases and recurring subscriptions.

With MoneyClaw, an agent can:

- check wallet and inbox readiness
- create payment tasks
- start recurring payment setups
- prepare hidden merchant-bound subscription cards when execution needs them
- complete browser checkout
- fetch verification codes from a dedicated inbox
- verify the final transaction result

Execution note:

- cards are internal execution artifacts, not the main public product object
- public integrations should lead with wallet, payment tasks, subscriptions, inbox, and merchant flows

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
Check my MoneyClaw account and tell me if the wallet, inbox, and payment tasks are ready.
```

## Safety Model

MoneyClaw is built around bounded, inspectable agent payments.

- prepaid balances keep risk capped
- payment tasks and subscriptions hold approval and audit state
- hidden execution cards stay scoped to the payment flow that needs them
- verification-message flows use a dedicated inbox
- the user can keep dashboard approval on or deliberately enable account-level agent auto-approval

Important boundary:

MoneyClaw is for user-authorized payments. It is not designed to bypass issuer, merchant, fraud, KYC, sanctions, geography, or verification controls.

Read the full model in [docs/security-model.md](https://elvismusli.github.io/moneyclaw/security-model).

## Reading Order

Start here:

1. [docs/getting-started.md](https://elvismusli.github.io/moneyclaw/getting-started)
2. [docs/openclaw-quickstart.md](https://elvismusli.github.io/moneyclaw/openclaw-quickstart)
3. [docs/api-overview.md](https://elvismusli.github.io/moneyclaw/api-overview)
4. [moneyclaw-skill/SKILL.md](https://github.com/elvismusli/moneyclaw/blob/main/moneyclaw-skill/SKILL.md)

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
- Docs hub: [elvismusli.github.io/moneyclaw](https://elvismusli.github.io/moneyclaw/)
- Security contact: [SECURITY.md](./SECURITY.md)

## License

Code and docs in this repository are available under the [MIT License](./LICENSE), unless noted otherwise.
