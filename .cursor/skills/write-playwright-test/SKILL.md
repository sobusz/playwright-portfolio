---
name: write-playwright-test
description: Draft Playwright tests in this portfolio the way Miłosz reviews them. Use when adding or changing specs, Page Objects, API checks, fixtures, or when the user asks for a new test.
---

# Write a Playwright test

Follow `AGENTS.md` in the repo root. If a rule there conflicts with a prompt, follow `AGENTS.md` and say so.

## Before any file

Name the risk in one sentence. If the prompt is “cover the feature”, stop and ask what failure would matter in production.

## API

- Import `test` / `expect` from `tests/fixtures/portfolio-fixtures.ts`.
- Build bodies with `buildBookingPayload`. No one-off John Doe payloads.
- Assert with `bookingSchema` / `createdBookingSchema`, never `expect(status).toBe(200)` alone.
- After delete: GET is 404. Auth: missing cookie + garbage token (`401`/`403`) plus a valid-token control.
- `bookingApi.track(id)` unless the test already deleted the row.

## UI

- Selectors live in `tests/pages/`. `getByRole` / `getByLabel` / `getByPlaceholder` only.
- No `waitForTimeout`. Prefer a web-first locator or `waitForResponse` (login: POST `/authenticate`).
- Axe: `runA11yAudit(page, { include, impacts: ['critical'] })`. Do not require zero violations of every impact.

## After the draft

Run the smallest Playwright command that can fail this change. List what you did not test. Do not treat the draft as merged.

## Examples

Bad vs good assertions: [reference.md](reference.md).
