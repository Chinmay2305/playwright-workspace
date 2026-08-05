const { test, expect } = require('@playwright/test');

test('Section10-51-Handle Popups and Alerts', async ({ page }) => {

    page.on('dialog', async dialog => {
        console.log('Message:', dialog.message());
        await dialog.accept();
    });

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.pause();
    await page.locator('#confirmbtn').click();
});