# Examples

## Prompts

### Account Readiness

```text
Check my MoneyClaw account, show wallet balance vs card balance, and tell me if it is ready for a purchase.
```

### Card Setup

```text
Issue a MoneyClaw card and top it up with $20 if needed. Ask before checkout unless I say the purchase is pre-authorized.
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

### Issue A Card

```bash
curl -X POST \
  -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/cards/issue
```

### Fetch Latest OTP

```bash
curl -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/inbox/latest-otp
```
