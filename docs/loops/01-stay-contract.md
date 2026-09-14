# 01 — Stay contract

Prompt I gave the agent:

> Restful Booker stores a booking when checkout is before checkin (HTTP 200). Do not add visual tests. Protect the stay dates. If you are not sure what to assert, ask.

## Agent draft

[`69e7233`](https://github.com/sobusz/playwright-portfolio/commit/69e7233) — `tests/api/booking-dates.contract.spec.ts`

- HTTP 200 and `firstname === John`
- 300ms sleep, no Zod, no cleanup

That stays green while the product keeps impossible stays.

## My review

[`0f75c77`](https://github.com/sobusz/playwright-portfolio/commit/0f75c77)

- HTTP 200 is the product hole, not the pass
- Track the id for cleanup
- Typed GET must throw; raw body must fail Zod on `checkout`

Diff: https://github.com/sobusz/playwright-portfolio/compare/69e7233...0f75c77
