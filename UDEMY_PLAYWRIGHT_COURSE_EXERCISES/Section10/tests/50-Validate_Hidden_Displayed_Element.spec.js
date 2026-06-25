const {test,expect} = require('@playwright/test'); //we are importing test here

test('Section10-50-Validate Hidden and Displayed Element',async ({page})=>
{
        await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
        await page.mouse.wheel(0, 500);

        await expect(page.locator("#displayed-text")).toBeVisible();
        await page.locator("#hide-textbox").click();
        await expect(page.locator("#displayed-text")).toBeHidden();
    }
);