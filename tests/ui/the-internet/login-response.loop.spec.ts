import { test, expect } from '../../fixtures/portfolio-fixtures';
import { TheInternetLoginPage } from '../../pages/the-internet/login-page';

test.describe('Login response @ui @loop', () => {
  test('logs in', async ({ page, siteUrls }) => {
    const loginPage = new TheInternetLoginPage(page, siteUrls.theInternet);
    await loginPage.goto();
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    await page.waitForTimeout(5000);
    expect(page.url()).toContain('secure');
  });
});
