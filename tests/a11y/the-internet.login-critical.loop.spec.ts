import { test } from '../fixtures/portfolio-fixtures';
import { TheInternetLoginPage } from '../pages/the-internet/login-page';
import { runA11yAudit } from '../utils/a11y';

test.describe('Login axe @a11y @loop', () => {
  // Review: color-contrast/landmarks on the demo chrome would delete this scan.
  test('login form has no critical axe violations', async ({ page, siteUrls }) => {
    const loginPage = new TheInternetLoginPage(page, siteUrls.theInternet);
    await loginPage.goto();
    await loginPage.expectOnLoginPage();
    await runA11yAudit(page, { include: 'form', impacts: ['critical'] });
  });
});
