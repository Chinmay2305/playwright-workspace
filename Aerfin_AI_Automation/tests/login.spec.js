const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test.describe('Aerfin Login Tests', () => {
  const validUsername = 'support@acumen.aero';
  const validPassword = 'Acumen@123';
  const wrongUsername = 'wrong@acumen.aero';
  const wrongPassword = 'WrongPass123';

  // Expected home path (use regex to match full URL ending with /home)
  const expectedHomePattern = /.*\/home$/;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Incorrect username + correct password -> should NOT navigate to home', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(wrongUsername, validPassword);

    await expect(page).not.toHaveURL(expectedHomePattern);
    await expect(login.loginButton).toBeVisible();
  });

  test('Correct username + incorrect password -> should NOT navigate to home', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(validUsername, wrongPassword);

    await expect(page).not.toHaveURL(expectedHomePattern);
    await expect(login.loginButton).toBeVisible();
  });

  test('Incorrect username + incorrect password -> should NOT navigate to home', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(wrongUsername, wrongPassword);

    await expect(page).not.toHaveURL(expectedHomePattern);
    await expect(login.loginButton).toBeVisible();
  });

  // Run invalid login attempts first, then run the valid login last which will
  // also navigate to Flip Trading and apply a STATUS=CANCELLED filter.
  test('Correct username + correct password -> should navigate to home and filter CANCELLED in Flip Trading', async ({ page }) => {
    const FlipTradingPage = require('../pages/FlipTradingPage');
    const login = new LoginPage(page);
    const flip = new FlipTradingPage(page);

    await login.login(validUsername, validPassword);

    // Verify URL
    await expect(page).toHaveURL(expectedHomePattern);

    // Sanity: login button should be hidden
    await expect(login.loginButton).toBeHidden();

    // Use FlipTradingPage methods
    await flip.goTo();
    await flip.applyStatusFilter('CANCELLED');

    // Assert status column values
    const statusCells = flip.getStatusCells();
    await expect(statusCells.first()).toHaveText(/cancelled/i, { timeout: 20000 });
    const count = await statusCells.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(statusCells.nth(i)).toHaveText(/cancelled/i);
    }
  });
});

