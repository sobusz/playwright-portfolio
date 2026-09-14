# Agent job on this repo

You draft tests. A human decides what is worth testing and merges.

Reviewed examples: `docs/loops/README.md`. Cursor skill: `.cursor/skills/write-playwright-test/SKILL.md`. Review skill: `.cursor/skills/review-playwright-test/SKILL.md`.

## Risk first

1. Name the risk in one sentence. If you cannot, ask — do not invent coverage.
2. One behaviour per test. Do not “cover the feature”.
3. The assertion must fail when that risk is real. HTTP 200, a visible heading, or `waitForTimeout` is not a risk.

## UI

- Locators: `getByRole` / `getByLabel` / `getByPlaceholder` only. Keep them in `tests/pages/`.
- No `waitForTimeout`. Wait for the thing: a locator, or `waitForResponse` on the request that matters (login: POST `/authenticate`).
- Do not add visual, mock, or perf tests unless asked.
- Axe: scan the surface under test, fail on **critical** only, attach the rest. Do not fail the suite on demo-site landmarks.

## API

- Import `test` / `expect` from `tests/fixtures/portfolio-fixtures.ts`.
- Build bodies with `buildBookingPayload`. Do not hardcode one `John` / `Doe`.
- A 200 is not a pass. Parse with Zod in `tests/utils/restful-booker.schemas.ts`.
- Checkout must be after checkin. If the API stores inverted dates, the contract fails — do not treat create 200 as success.
- After delete, GET must be 404. Do not stop at “delete returned”.
- Auth: missing cookie **and** a garbage token. Expect `401` or `403`. Include a valid-token control.
- Call `bookingApi.track(id)` unless this test already deleted the booking.

## After you draft

1. Run the smallest command that can fail your change, e.g. `npx playwright test tests/api --project=chromium`.
2. Say what you did **not** test.
3. Do not merge. A human reviews the assertion.
