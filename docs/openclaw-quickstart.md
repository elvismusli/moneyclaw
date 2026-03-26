# OpenClaw Quickstart

This is the fastest path from install to first real payment-capable session.

## Install

```bash
clawhub install moneyclaw
```

## Configure

Add your MoneyClaw API key to OpenClaw secrets as:

```text
MONEYCLAW_API_KEY
```

Start a fresh session after install.

## Choose Your Control Mode

- approval-based: the agent asks before payment actions
- pre-authorized: the agent can act inside the spend scope and permissions you configured

## Suggested First Session

### 1. Check readiness

```text
Check my MoneyClaw account and tell me whether it is purchase-ready.
```

### 2. Create a payment task

```text
Create a pre-authorized payment task for this purchase and keep the amount bounded to the expected total.
```

### 3. For recurring spend, create a subscription

```text
Turn that approved subscription setup into a recurring subscription and prepare the payment flow for the same service.
```

### 4. Complete checkout

```text
Finish this checkout and, if 3DS appears, fetch the latest OTP from MoneyClaw inbox and verify the final transaction status.
```

## Mental Model

- wallet funds the execution
- payment tasks and subscriptions are the main product objects
- recurring subscriptions can use hidden merchant-bound cards
- verification codes come through the dedicated inbox
- cards stay behind the system-managed execution layer instead of appearing as the main public integration object
- transaction state should be checked before retries
