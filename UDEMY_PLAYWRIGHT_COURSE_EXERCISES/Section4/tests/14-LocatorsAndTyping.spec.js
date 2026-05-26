const {test} = require('@playwright/test'); //we are importing test here


test('Text entering playwright test',async ({browser})=>
{
    //create chrome instance
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())

    await page.locator('#username').fill('Chinmay Agrawal')
    await page.locator('#password').fill("password")
    await page.locator('#signInBtn').click();
}
);