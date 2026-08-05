import { test, expect } from '@playwright/test';

async function verifyRefund(page, expectedMessage)
{
  await page.getByTestId('check-refund-btn').click();
  const actualMessage = (await page.getByTestId('refund-result').textContent()).trim();
  console.log("Expected :", expectedMessage);
  console.log("Actual   :", actualMessage);
  expect(actualMessage).toBe(expectedMessage);
}

test('test', async ({ page }) => {
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByRole('textbox', { name: 'Email' }).fill('chinmay230587@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Chinmay5345&');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Browse Events →' }).click();
  await page.getByRole('article').filter({ hasText: 'ConferenceTest TitleSat, 1' }).getByTestId('book-now-btn').click();
  await page.getByRole('textbox', { name: 'Full Name*' }).fill('Chinmay Agrawal');
  await page.getByTestId('customer-email').fill('chinmay230587@gmail.com');
  await page.getByRole('textbox', { name: 'Phone Number*' }).fill('8238997664');
  await page.getByText('1', { exact: true }).click();
  await page.getByRole('button', { name: 'Confirm Booking' }).click();
  await page.getByRole('button', { name: 'View My Bookings' }).click();
  await page.getByRole('button', { name: 'View Details' }).first().click();
  await expect(page.getByRole('main')).toContainText('1');
  await verifyRefund(page,'Eligible for refund. Single-ticket bookings qualify for a full refund.');

  await page.getByTestId('nav-events').click();
  await page.getByRole('article').filter({ hasText: 'ConferenceTest TitleSat, 1' }).getByTestId('book-now-btn').click();
  await page.getByRole('button', { name: '+' }).dblclick();
  await page.getByRole('textbox', { name: 'Full Name*' }).fill('Chinmay Agrawal');
  await page.getByTestId('customer-email').fill('chinmay230587@gmail.com');
  await page.getByRole('textbox', { name: 'Phone Number*' }).fill('8238997664');
  await page.getByRole('button', { name: 'Confirm Booking' }).click();
  await page.getByRole('button', { name: 'View My Bookings' }).click();
  await page.screenshot({ path: 'bookings.png', fullPage: true });
  await page.getByRole('button', { name: 'View Details' }).first().click();
  await expect(page.getByRole('main')).toContainText('3');
  await verifyRefund(page,'Not eligible for refund. Group bookings (3 tickets) are non-refundable.');
});