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

- dashboard approval: default; API-key-created tasks wait for approval in the MoneyClaw dashboard
- agent auto-approval: optional; enable it in the dashboard only if you want your connected OpenClaw agent to keep moving without a second approval click

## Suggested First Session

### 1. Check readiness

```text
Check my MoneyClaw account and tell me whether it is purchase-ready.
```

### 2. Create a payment task

```text
Create a payment task for this purchase and keep the amount bounded to the expected total.
```

### 3. Continue the approved payment step

```text
Continue this approved payment step and confirm the final result.
```

## Mental Model

- wallet funds the execution
- payment tasks are the main product object for the default buyer flow
- account-level agent auto-approval controls whether OpenClaw needs a second dashboard approval click
- receipts and account messages stay visible in the dedicated inbox
- MoneyClaw prepares any needed execution path behind the scenes
- transaction state should be checked before retries
