# 03 — Auth matrix

Prompt I gave the agent:

> An update without a real session must not change the booking. Cover missing cookie and a garbage token. Do not hardcode a single status if the API uses 401 or 403.

## Agent draft

[`d1e3fd6`](https://github.com/sobusz/playwright-portfolio/commit/d1e3fd6)

- One PUT, no cookie, `expect(status).toBe(403)`
- Hardcoded URL and payload
- No control with a valid token

## My review

A 403-only test fails on 401 and never tries a bad cookie.

- Two negatives: no cookie, `token=not-a-session`
- Accept **401 or 403**
- Control: real token + Zod on the updated body
