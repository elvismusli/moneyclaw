# Curl Examples

## Check Account

```bash
curl -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/me
```

## Create A Payment Task

```bash
curl -X POST \
  -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"intentType":"subscription_setup","approvalMode":"pre_authorized","merchantName":"OpenAI","merchantDomain":"openai.com","expectedAmount":"20.00","fundingCap":"20.00","currency":"USD"}' \
  https://moneyclaw.ai/api/payment-intents
```

## Fetch Latest OTP

```bash
curl -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/inbox/latest-otp
```

## Compatibility-Only Card Flow

```bash
curl -X POST \
  -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  -H "X-MoneyClaw-Compatibility-Mode: visible-card" \
  https://moneyclaw.ai/api/cards/issue
```
