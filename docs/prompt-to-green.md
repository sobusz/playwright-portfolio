# From prompt to a passing contract test

This is the artifact for hiring: how an agent drafts a test here, and how a human decides what the test is actually for.

Repo rules for the agent: [AGENTS.md](../AGENTS.md). Cursor skill: `.cursor/skills/write-playwright-test/SKILL.md`. CI: `.github/workflows/api-ci.yml` (Playwright API tests on Chromium).

## Prompt

> Restful Booker stores a booking when checkout is before checkin (HTTP 200). Do not add visual tests. Protect the stay dates. If you are not sure what to assert, ask.

## What the agent did

Commit [`69e7233`](https://github.com/sobusz/playwright-portfolio/commit/69e7233): `tests/api/booking-dates.contract.spec.ts`

- Called the API with inverted dates.
- Asserted **status 200** and **firstname === John**.
- Slept 300ms. No Zod. No cleanup. No question about risk.

That test would stay green while the product kept impossible stays. The agent automated the copying, not the meaning.

## What I changed

Commit [`0f75c77`](https://github.com/sobusz/playwright-portfolio/commit/0f75c77)

- Left the HTTP 200 — that is the product hole, not the pass condition.
- Tracked the booking id so the fixture deletes it.
- `GET` through the typed client must throw.
- Raw body must fail `bookingSchema` on `checkout` (checkout after checkin).

Diff: https://github.com/sobusz/playwright-portfolio/compare/69e7233...0f75c77

## Green run (local)

```
npx playwright test tests/api --project=chromium
```

4 passed, including the reviewed dates test. GitHub Actions on this branch repeats that command.

## What I did not generate

No extra UI suite, no screenshots, no “cover the whole API”. One risk: a stay that cannot exist.
