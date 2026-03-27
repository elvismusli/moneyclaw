# Security Model

MoneyClaw is designed around user-authorized agent payments.

The goal is not to make payments invisible. The goal is to make real payments bounded, inspectable, and easier to control.

## Core Principles

- prepaid by default
- bounded spend
- explicit user approval by default, with optional pre-authorized scopes configured ahead of time
- visible wallet and payment-task history
- system-managed execution rather than card-as-product-object
- dedicated verification inbox

## What MoneyClaw Is For

MoneyClaw is for real purchases and payment flows requested or approved by the user. Some accounts may also use narrowly scoped pre-authorized operation that was configured ahead of time.

## What MoneyClaw Is Not For

MoneyClaw is not a tool for:

- bypassing issuer controls
- bypassing merchant verification
- bypassing fraud systems
- bypassing KYC, sanctions, or geographic restrictions
- fabricating billing identity or verification data

## Safe Default Behavior

- inspect wallet and payment-task state before acting
- keep spending prepaid and task-scoped
- use verification messages only as part of the normal checkout flow
- inspect final transaction state before retrying

## Public Boundary

This repo intentionally publishes the trust and safety model.

Internal operations, infrastructure hardening, incident handling, and provider-specific defensive runbooks are intentionally not included here.
