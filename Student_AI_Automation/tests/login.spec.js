const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

const DASHBOARD_URL = 'https://student-devcode.vercel.app/dashboard.html';

test.describe('Login flow tests (POM)', () => {
  test('1. Correct username + correct password -> should navigate to dashboard', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/');
    const login = new LoginPage(page);
    await login.login('admin', '123');
    await expect(page).toHaveURL(DASHBOARD_URL, { timeout: 5000 });
    await context.close();
  });

  test('2. Incorrect username + correct password -> should show failure', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/');
    const login = new LoginPage(page);
    await login.login('wronguser', '123');
    // Validate user does NOT reach dashboard by asserting login button still visible and URL not dashboard
    await expect(page.locator('xpath=//button')).toBeVisible({ timeout: 3000 });
    await expect(page).not.toHaveURL(DASHBOARD_URL);
    await context.close();
  });

  test('3. Correct username + incorrect password -> should show failure', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/');
    const login = new LoginPage(page);
    await login.login('admin', 'wrongpass');
    await expect(page.locator('xpath=//button')).toBeVisible({ timeout: 3000 });
    await expect(page).not.toHaveURL(DASHBOARD_URL);
    await context.close();
  });

  test('4. Incorrect username + incorrect password -> should show failure', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/');
    const login = new LoginPage(page);
    await login.login('bad', 'bad');
    await expect(page.locator('xpath=//button')).toBeVisible({ timeout: 3000 });
    await expect(page).not.toHaveURL(DASHBOARD_URL);
    await context.close();
  });
});

