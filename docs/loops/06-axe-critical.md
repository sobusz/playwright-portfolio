# 06 — Axe critical on the form

Prompt I gave the agent:

> Do not fail the suite on every axe finding on this demo. Scan the login form. Fail only on critical.

## Agent draft

[`d7d0510`](https://github.com/sobusz/playwright-portfolio/commit/d7d0510)

- `runA11yAudit(page)` with no filter
- Failed on color-contrast (serious), heading-order, landmarks, region — **no critical**

That scan would get deleted in a week.

## My review

- `include: 'form'`
- `impacts: ['critical']`
- JSON still attached by the helper
