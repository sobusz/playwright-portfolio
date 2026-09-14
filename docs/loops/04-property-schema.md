# 04 — Random stays

Prompt I gave the agent:

> Do not trust one hardcoded booking. Random factory payloads must still match the stay contract after GET.

## Agent draft

[`7e0a1dc`](https://github.com/sobusz/playwright-portfolio/commit/7e0a1dc)

- One John/Doe body
- Asserted firstname only

## My review

One lucky payload hides a broken refine.

- `buildBookingPayload()` × 8
- `bookingSchema.safeParse` on GET
- Attach payload + issues if parse fails
- `checkout > checkin` on the parsed dates
