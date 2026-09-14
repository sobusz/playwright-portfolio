---
name: review-playwright-test
description: Review Playwright specs the way Miłosz does before merge. Use when reviewing a test, an agent draft, a diff, or when asked if a spec is worth keeping.
---

# Review a Playwright test

You are not scoring style. You are checking whether the assertion matches a real risk.

Follow `AGENTS.md`. Examples: `.cursor/skills/write-playwright-test/reference.md`.

## Pass only if

1. The test names one risk (title or first comment).
2. A product bug of that kind would turn the spec red.
3. Locators are roles/labels, or API bodies go through Zod / the client.
4. No `waitForTimeout`.
5. Cleanup is tracked, or the test already deleted the booking.

## Reject (ask for a rewrite) if

- The pass condition is HTTP 200, a URL, or a sleep.
- Auth covers only one negative, with a single expected status.
- Axe fails the whole page on moderate noise.
- Visual uses a ratio that would hide a real change.
- The prompt was “add coverage” and the spec has no risk sentence.

## How to reply

Quote the assertion. Say what still passes if the product is wrong. Then the rewrite in one sentence.
