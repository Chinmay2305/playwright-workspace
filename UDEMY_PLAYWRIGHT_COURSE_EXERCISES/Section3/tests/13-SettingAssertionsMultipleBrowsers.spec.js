const {test, expect} = require('@playwright/test'); //we are importing test here

//I want to verify title of the page

test('First Playwright test',async ({browser,page})=>     //2 arguments - test case name & test case function
{
    await page.goto("https://google.com")
    //get title and add assertion to see if it's correct
    console.log(await page.title())
    await expect(page).toHaveTitle("Google")
});


test('Second Playwright test',async ({browser})=>
{
    //create chrome instance
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())
}
);