import { test, expect } from '@playwright/test';

test.describe.configure({mode: 'parallel'});

test('Test 1', async ({ page }) => {
    await page.goto('https://google.com');
});

test('Test 2', async ({ page }) => {
    await page.goto('https://amazon.com');
});

test('Test 3', async ({ page }) => {
    await page.goto('https://flipkart.com');
});