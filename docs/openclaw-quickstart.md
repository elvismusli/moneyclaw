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

### 2. Issue a card

```text
Issue a MoneyClaw card and top it up with $20 if needed.
```

### 3. Complete checkout

```text
Finish this checkout and, if 3DS appears, fetch the latest OTP from MoneyClaw inbox and verify the final transaction status.
```

## Mental Model

- wallet balance and card balance are different
- the card is prepaid
- verification codes come through the dedicated inbox
- transaction state should be checked before retries
