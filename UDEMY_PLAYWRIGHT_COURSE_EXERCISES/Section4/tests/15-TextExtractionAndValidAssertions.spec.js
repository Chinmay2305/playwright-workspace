const {test, expect} = require('@playwright/test'); //we are importing test here


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
    //wait until error locator appears on the page
    console.log(await page.locator("[style*='block']").textContent());
    //textContent() is extract the text from the locator

    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    //this will pass as "Incorrect" is there
    await expect(page.locator("[style*='block']")).toContainText('Incorrecta');
    //this will fail as "Incorrecta" is not there
}
);