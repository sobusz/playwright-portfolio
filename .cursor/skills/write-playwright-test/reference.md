# Assertions this repo accepts

The human merges the right-hand column. Do not ship the left.

| Risk            | Agent default (reject)                     | Review (merge)                                                      |
| --------------- | ------------------------------------------ | ------------------------------------------------------------------- |
| Impossible stay | `expect(status).toBe(200)` and a firstname | Zod: checkout after checkin, even if create is 200                  |
| Delete          | Function returned                          | GET after delete is 404                                             |
| Auth            | One PUT, hardcoded `403`                   | No cookie + garbage token; `401` or `403`; valid token still parses |
| Random data     | One hardcoded John                         | Factory × several, every GET parses                                 |
| Login           | `waitForTimeout(5000)` + URL               | `waitForResponse` on POST `/authenticate`                           |
| Axe             | All impacts = 0                            | Form (or surface) + **critical** only                               |
| Visual          | Full page, `maxDiffPixelRatio: 0.5`        | Clip the control, small ratio; skip on mismatched CI OS             |

Commands:

```
npx playwright test tests/api --project=chromium
npx playwright test --grep "@loop" --project=chromium
```
