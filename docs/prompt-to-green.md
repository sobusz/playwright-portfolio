# From prompt to a passing test

I draft with Cursor. I review before anything lands in the suite. That split is the job, not a slogan.

**Catalog (every loop = agent commit + my review):** [docs/loops/README.md](loops/README.md)

Rules: [AGENTS.md](../AGENTS.md) · skill: `.cursor/skills/write-playwright-test/SKILL.md` · CI: `.github/workflows/api-ci.yml`

| #                                   | I asked for             | Agent shipped    | I changed it to             |
| ----------------------------------- | ----------------------- | ---------------- | --------------------------- |
| [01](loops/01-stay-contract.md)     | Protect stay dates      | 200 + name       | Zod: checkout after checkin |
| [02](loops/02-delete-404.md)        | Booking is gone         | delete returned  | GET is 404                  |
| [03](loops/03-auth-matrix.md)       | No session, no update   | one 403          | missing + garbage token     |
| [04](loops/04-property-schema.md)   | Contract on random data | one John         | faker × 8                   |
| [05](loops/05-wait-for-response.md) | Login without sleep     | `waitForTimeout` | `waitForResponse`           |
| [06](loops/06-axe-critical.md)      | A11y that we can keep   | all axe = 0      | form, critical only         |
| [07](loops/07-visual-mask.md)       | Stable screenshot       | full page, 0.5   | form clip, 0.02             |

Open the pull request to see the two-commit history on each spec: https://github.com/sobusz/playwright-portfolio/pull/2
