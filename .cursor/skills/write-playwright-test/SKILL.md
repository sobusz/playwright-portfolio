---
name: write-playwright-test
description: Draft Playwright tests in this portfolio the way Miłosz reviews them. Use when adding or changing specs, Page Objects, API checks, or fixtures in playwright-portfolio.
---

# Write a Playwright test

Follow `AGENTS.md` in the repo root.

## API tests

- Import `test` / `expect` from `tests/fixtures/portfolio-fixtures.ts`.
- Build bodies with `buildBookingPayload`.
- Assert contracts with `bookingSchema` / `createdBookingSchema`, not `expect(status).toBe(200)` alone.

## UI tests

- Put selectors in `tests/pages/`.
- Prefer roles and labels. No CSS ids unless the demo page has no accessible name.

## Stop and ask

If the prompt is “cover the feature” with no risk, do not generate a suite. Ask what failure would matter in production.
