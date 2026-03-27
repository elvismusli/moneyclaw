# Examples

## Prompts

### Account Readiness

```text
Check my MoneyClaw account and tell me if the wallet, inbox, and payment tasks are ready.
```

### Create A Payment Task

```text
Create a payment task for this purchase and keep the amount bounded to the requested total.
```

### Continue A Payment Step

```text
Continue this approved payment step and confirm the final result.
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
  -d '{"intentType":"one_time_purchase","merchantName":"OpenAI","merchantDomain":"openai.com","expectedAmount":"20.00","fundingCap":"20.00","currency":"USD"}' \
  https://moneyclaw.ai/api/payment-intents
```

### Inspect Latest Inbox Message

```bash
curl -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/inbox/latest
```
