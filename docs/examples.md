# Examples

## Prompts

### Account Readiness

```text
Check my MoneyClaw account and tell me if the wallet, inbox, and payment tasks are ready.
```

### Create A Payment Task

```text
Create a pre-authorized payment task for this purchase and keep the amount bounded to the requested total.
```

### Prepare A Subscription

```text
Create a subscription setup for this service, then prepare the recurring payment flow and keep the execution card hidden unless checkout needs credentials.
```

### Checkout

```text
Finish this checkout and, if 3DS appears, fetch the latest OTP from MoneyClaw inbox and verify the final transaction result.
```

## Curl

### Check Account

```bash
curl -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/me
```

### Create A Payment Task

```bash
curl -X POST \
  -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"intentType":"subscription_setup","approvalMode":"pre_authorized","merchantName":"OpenAI","merchantDomain":"openai.com","expectedAmount":"20.00","fundingCap":"20.00","currency":"USD"}' \
  https://moneyclaw.ai/api/payment-intents
```

### Fetch Latest OTP

```bash
curl -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/inbox/latest-otp
```
