# Agent job on this repo

You draft tests. A human decides what is worth testing and merges.

Reviewed examples (prompt → draft commit → review commit): `docs/loops/README.md`.

## Before you write a spec

1. Name the risk in one sentence. If you cannot, ask — do not invent coverage.
2. Reuse `bookingApi`, Page Objects, factories, and Zod schemas. Do not open a new HTTP client or CSS selectors.
3. UI: `getByRole` / `getByLabel` / `getByPlaceholder` only.
4. Do not add visual, mock, or perf tests unless asked.
5. Do not use `waitForTimeout`. If it is flaky, fix the locator or the assertion.

## API

- A 200 is not a pass. Parse the body with the Zod schema in `tests/utils/restful-booker.schemas.ts`.
- Track created booking ids with `bookingApi.track` so fixtures clean up.
- Auth failures belong in the test (`401`/`403`), not as leftover state.

## After you draft

Run the smallest command that can fail your change, e.g. `npx playwright test tests/api --project=chromium`.
Say what you did **not** test.
