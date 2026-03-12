# Security Model

MoneyClaw is designed around user-authorized agent payments.

## Core Principles

- prepaid by default
- bounded spend
- explicit user authorization or pre-authorization
- visible wallet and card history
- dedicated OTP and 3DS inbox

## What MoneyClaw Is For

MoneyClaw is for real purchases and payment flows requested or pre-authorized by the user.

## What MoneyClaw Is Not For

MoneyClaw is not a tool for:

- bypassing issuer controls
- bypassing merchant verification
- bypassing fraud systems
- bypassing KYC, sanctions, or geographic restrictions
- fabricating billing identity or verification data

## Safe Default Behavior

- inspect wallet and card state before acting
- keep spending prepaid and task-scoped
- use OTP and 3DS only as part of the normal verification flow
- inspect final transaction state before retrying

## Public Boundary

This repo intentionally publishes the trust and safety model.

Internal operations, infrastructure hardening, incident handling, and provider-specific defensive runbooks are intentionally not included here.
