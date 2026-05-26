const {test, expect} = require('@playwright/test'); //we are importing test here

//Opening child window
test.only('Child windows handling', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username = page.locator('#username');
    const documentlink = page.locator("[href*='documents-request']");

   //These are asynchronous steps in 1 Promise method 
   // - it will iterate until all these promises are fulfilled
   
   //newPage will open more than 1 window so, it will be an array. So, mention as []
   //If 1 more tab - [newpage, newpage2, newpage3, and so on]
   const [newPage] = await Promise.all(
    [
        context.waitForEvent('page'), //listen for a new page pending, rejected, fulfilled - 3 promise statuses
        documentlink.click(),
    ]) //newPage is opened

    const text = await newPage.locator(".red").textContent();
    //newPage because this is newly opened page now, we made above
    //If I still write "page", it will keep searching in the original tab
    console.log(text);

    //NEXT GOAL - pull out the email domain from above string and enter in username box of 1st tab
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);
    
    await page.locator("#username").type(domain); //this will search in original tab now
    await page.bringToFront();
    console.log(await page.locator("#username").inputValue());//will return entered value
    console.log("see-"+await page.locator("#username").textContent());//will return blank
    await page.waitForTimeout(5000);
});

//if you entered a text in a textbox and want to fetch it back - inputValue()
//textContent() will not help there. It will return blank.