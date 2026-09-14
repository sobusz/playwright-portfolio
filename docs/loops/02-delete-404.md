# 02 — Delete then 404

Prompt I gave the agent:

> After delete, the booking must not be readable. Do not assert only that delete returned. Use a booking we created in this test.

## Agent draft

[`792802f`](https://github.com/sobusz/playwright-portfolio/commit/792802f)

- Created, deleted, `expect(true).toBe(true)`
- Never GET after delete
- Tracked the id so the fixture would delete again

## My review

- No fixture `track` — we already deleted
- GET `/booking/:id` must be **404**
- Attach the status to the report

Review commit: [`82d8940`](https://github.com/sobusz/playwright-portfolio/commit/82d8940)
Diff: https://github.com/sobusz/playwright-portfolio/compare/792802f...82d8940

Restful Booker: DELETE is `201`, GET after delete is `404`.
