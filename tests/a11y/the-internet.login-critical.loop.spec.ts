import { test } from '../fixtures/portfolio-fixtures';
import { TheInternetLoginPage } from '../pages/the-internet/login-page';
import { runA11yAudit } from '../utils/a11y';

test.describe('Login axe @a11y @loop', () => {
  test('login page has no a11y violations', async ({ page, siteUrls }) => {
    const loginPage = new TheInternetLoginPage(page, siteUrls.theInternet);
    await loginPage.goto();
    await runA11yAudit(page);
  });
});
