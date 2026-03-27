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

- approval-based: default and recommended; the agent asks before payment actions
- pre-authorized: use only when you deliberately configured that spend scope ahead of time

## Suggested First Session

### 1. Check readiness

```text
Check my MoneyClaw account and tell me whether it is purchase-ready.
```

### 2. Create a payment task

```text
Create an approval-based payment task for this purchase and keep the amount bounded to the expected total.
```

### 3. Continue the approved payment step

```text
Continue this approved payment step and only read the latest verification message from MoneyClaw inbox if the checkout asks for a code.
```

## Mental Model

- wallet funds the execution
- payment tasks are the main product object for the default buyer flow
- verification messages come through the dedicated inbox
- MoneyClaw prepares any needed execution path behind the scenes
- transaction state should be checked before retries
