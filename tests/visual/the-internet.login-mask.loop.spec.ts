import { test, expect } from '../fixtures/portfolio-fixtures';
import { TheInternetLoginPage } from '../pages/the-internet/login-page';

test.describe('Visual login mask @visual @loop', () => {
  test('login page screenshot', async ({ page, siteUrls }) => {
    const loginPage = new TheInternetLoginPage(page, siteUrls.theInternet);
    await loginPage.goto();
    await expect(page).toHaveScreenshot('login-loose.png', { maxDiffPixelRatio: 0.5 });
  });
});
