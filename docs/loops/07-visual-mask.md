# 07 — Visual clip

Prompt I gave the agent:

> Screenshot the login form, not the whole page. Do not hide flakes with maxDiffPixelRatio 0.5.

## Agent draft

[`9f1f1ba`](https://github.com/sobusz/playwright-portfolio/commit/9f1f1ba)

- Full page
- `maxDiffPixelRatio: 0.5` (almost anything passes)

## My review

- Locator `#login` (the form)
- Ratio **0.02**
- Baseline: `login-form-visual-win32.png`
- **Skipped on CI** — Windows vs Ubuntu pixels. Run `--project=visual` locally.

This loop is about the review, not a green badge on GitHub Actions.
