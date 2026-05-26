const {test, expect} = require('@playwright/test'); //we are importing test here


test('Text entering playwright test',async ({browser})=>
{
    //create chrome instance
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())

    //locators defined
    const userName = page.locator('#username');
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');
    const errormessage = page.locator("[style*='block']");
    const productname = page.locator(".card-body a")

    //logging in and starting the test
    await userName.fill('Chinmay Agrawal')
    await password.fill("Learning@830$3mK2")
    await signInBtn.click();
    //wait until error locator appears on the page
    console.log(await errormessage.textContent());
    //textContent() is extract the text from the locator
    await expect(errormessage).toContainText('Incorrect');
    //this will pass as "Incorrect" is there

    //this lecture: erase wrong content entered from textbox and pass correct one
    //2 methods to type anything - type & fill
    await userName.fill("");    //to erase something typed, fill("") is the correct one
    await userName.fill("rahulshettyacademy");
    await signInBtn.click();

    console.log(await productname.nth(1).textContent()); //returning 2nd product [1]
    console.log(await productname.first().textContent()); //returns first element
    console.log(await productname.last().textContent()); //returns last element
}
);