import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.getByRole('link', { name: 'Blackberry' }).click();
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.locator('app-card').filter({ hasText: 'Blackberry $24.99 Lorem ipsum' }).getByRole('button').click();
  await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).getByRole('button').click();
  await page.getByText('Checkout ( 2 ) (current)').click();
  await page.getByRole('cell', { name: 'Total' }).click();
  await expect(page.locator('tbody')).toContainText('Blackberry');
  await expect(page.locator('tbody')).toContainText('Samsung Note 8');
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('Vadodara');
  await expect(page.getByRole('textbox', { name: 'Please choose your delivery' })).toHaveValue('Vadodara');
  await page.getByText('I agree with the term &').click();
  await page.getByRole('button', { name: 'Purchase' }).click();
  await expect(page.getByText('× Success! Thank you! Your')).toBeVisible();
  await page.getByRole('button', { name: 'Purchase' }).click();
});

//Run with the command npx playwright codegen https://rahulshettyacademy.com/angularpractice/
//This will open the inspector window with running window. Use it to run at own pace 
// and see where error is coming or find any element locator