import { test, expect } from '../../fixtures/portfolio-fixtures';
import { TheInternetLoginPage } from '../../pages/the-internet/login-page';
import { TheInternetSecureAreaPage } from '../../pages/the-internet/secure-area-page';

test.describe('Login response @ui @loop', () => {
  // Review: a five-second sleep hides a failed /authenticate.
  test('successful login waits for authenticate then Secure Area', async ({ page, siteUrls }) => {
    const loginPage = new TheInternetLoginPage(page, siteUrls.theInternet);
    const secureAreaPage = new TheInternetSecureAreaPage(page);

    await loginPage.goto();
    await loginPage.expectOnLoginPage();

    const authenticate = page.waitForResponse(
      (response) =>
        response.url().includes('/authenticate') && response.request().method() === 'POST',
    );
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    const response = await authenticate;

    await test.info().attach('authenticate-status', {
      body: String(response.status()),
      contentType: 'text/plain',
    });
    expect(response.status(), 'authenticate should redirect or succeed').toBeLessThan(400);
    await expect(page.getByRole('heading', { name: 'Secure Area', exact: true })).toBeVisible();
    await secureAreaPage.expectLoginSuccess();
  });

  test('wrong password keeps the login page after authenticate', async ({ page, siteUrls }) => {
    const loginPage = new TheInternetLoginPage(page, siteUrls.theInternet);

    await loginPage.goto();

    const authenticate = page.waitForResponse(
      (response) =>
        response.url().includes('/authenticate') && response.request().method() === 'POST',
    );
    await loginPage.login('tomsmith', 'wrong-password');
    const response = await authenticate;

    await test.info().attach('authenticate-invalid-status', {
      body: String(response.status()),
      contentType: 'text/plain',
    });
    expect(response.status()).toBeLessThan(400);
    await expect(page.locator('#flash')).toContainText('Your password is invalid');
    await loginPage.expectOnLoginPage();
  });
});
