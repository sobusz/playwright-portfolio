# 05 — Login without sleep

Prompt I gave the agent:

> Login without waitForTimeout. Wait for POST /authenticate, then assert Secure Area. Also cover a wrong password.

## Agent draft

[`6598e77`](https://github.com/sobusz/playwright-portfolio/commit/6598e77)

- `waitForTimeout(5000)`
- URL contains `secure`
- No failed-login case

## My review

Sleep hides a failed authenticate. `/authenticate` returns **303**.

- `waitForResponse` on POST `/authenticate`
- Success: heading `Secure Area` (exact) + flash
- Wrong password: flash `Your password is invalid`, still on Login Page
