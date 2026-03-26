# Security Model

MoneyClaw is designed around user-authorized agent payments.

The goal is not to make payments invisible. The goal is to make real payments bounded, inspectable, and easier to control.

## Core Principles

- prepaid by default
- bounded spend
- explicit user approval by default, with optional pre-authorized scopes configured ahead of time
- visible wallet, payment-task, and subscription history
- hidden execution cards rather than card-as-product-object
- dedicated OTP and 3DS inbox

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

- inspect wallet, payment-task, and subscription state before acting
- keep spending prepaid and task-scoped
- use OTP and 3DS only as part of the normal verification flow
- inspect final transaction state before retrying

## Public Boundary

This repo intentionally publishes the trust and safety model.

Internal operations, infrastructure hardening, incident handling, and provider-specific defensive runbooks are intentionally not included here.
