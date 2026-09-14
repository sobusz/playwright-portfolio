# Agent drafts, I review

I use Cursor to draft tests. I merge only when the assertion matches a real risk.

Rules for the agent: [AGENTS.md](../../AGENTS.md). Skill: `.cursor/skills/write-playwright-test/SKILL.md`.

Index: [docs/prompt-to-green.md](../prompt-to-green.md).

| Loop                                              | Risk                                     | Agent draft                | My review                                  |
| ------------------------------------------------- | ---------------------------------------- | -------------------------- | ------------------------------------------ |
| [01 Stay contract](01-stay-contract.md)           | API stores checkout before checkin       | HTTP 200 + firstname       | Zod `checkout` after `checkin`             |
| [02 Delete then 404](02-delete-404.md)            | Delete “works”, booking still GET-able   | delete returned, test ends | GET after delete is 404                    |
| [03 Auth matrix](03-auth-matrix.md)               | Update without a session                 | one call, expect 403       | missing cookie + garbage token; 401 or 403 |
| [04 Random stays](04-property-schema.md)          | One hardcoded booking hides holes        | single John payload        | faker × 8, every GET parses                |
| [05 Login without sleep](05-wait-for-response.md) | Timeout hides a failed authenticate      | `waitForTimeout` + URL     | `waitForResponse` + Secure Area / flash    |
| [06 Axe critical on the form](06-axe-critical.md) | Full axe noise kills the suite           | all violations = 0         | form only, **critical** only               |
| [07 Visual clip](07-visual-mask.md)               | Fat `maxDiffPixelRatio` blinds the check | full page, 0.5 ratio       | form clip, 0.02 — CI optional              |

Each loop is two commits: `test(agent):` then `review:`.
