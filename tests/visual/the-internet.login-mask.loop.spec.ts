import { test, expect } from '../fixtures/portfolio-fixtures';
import { TheInternetLoginPage } from '../pages/the-internet/login-page';

test.describe('Visual login mask @visual @loop', () => {
  // Review: 0.5 ratio on the full page is a blind test. Clip to the form.
  test('login form screenshot stays within 2% pixels', async ({ page, siteUrls }) => {
    test.skip(!!process.env.CI, 'Form snapshots differ between Windows and Ubuntu CI.');

    const loginPage = new TheInternetLoginPage(page, siteUrls.theInternet);
    await loginPage.goto();
    await loginPage.expectOnLoginPage();

    const form = page.locator('#login');
    await expect(form).toHaveScreenshot('login-form.png', { maxDiffPixelRatio: 0.02 });
  });
});
