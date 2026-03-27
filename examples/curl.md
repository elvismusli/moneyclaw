# Curl Examples

## Check Account

```bash
curl -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/me
```

Read `mailboxAddress` from this response instead of hardcoding an inbox domain.

## Create A Payment Task

```bash
curl -X POST \
  -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"intentType":"one_time_purchase","approvalMode":"approval_based","merchantName":"OpenAI","merchantDomain":"openai.com","expectedAmount":"20.00","fundingCap":"20.00","currency":"USD"}' \
  https://moneyclaw.ai/api/payment-intents
```

## Read Latest Verification Message

```bash
curl -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/inbox/latest-otp
```
