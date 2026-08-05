import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
  await page.locator('button').nth(2).click();
  await page.getByRole('button', { name: 'June 2026', exact: true }).click();
  await page.getByRole('button', { name: '2026', exact: true }).click();
  await page.getByRole('button', { name: '2027' }).click();
  await page.getByRole('button', { name: 'July' }).click();
  await page.getByRole('button', { name: '23' }).click();
  await page.getByRole('searchbox', { name: 'Search:' }).click();
  await page.getByRole('searchbox', { name: 'Search:' }).fill('Tomato');
  await expect(page.locator('tbody')).toContainText('Tomato');
});