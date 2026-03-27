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
  -d '{"intentType":"one_time_purchase","merchantName":"OpenAI","merchantDomain":"openai.com","expectedAmount":"20.00","fundingCap":"20.00","currency":"USD"}' \
  https://moneyclaw.ai/api/payment-intents
```

If the account has `agentAutoApproveEnabled=true`, API-key-created tasks can move through the
auto-approved path without a second dashboard click. Otherwise they will wait for dashboard approval.

## Inspect Latest Inbox Message

```bash
curl -H "Authorization: Bearer $MONEYCLAW_API_KEY" \
  https://moneyclaw.ai/api/inbox/latest
```
