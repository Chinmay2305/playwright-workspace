const {test} = require('@playwright/test'); //we are importing test here

/*In java, execution will work in sequence but in javascript, it is asynchronous means, 
    all will execute at a time. So, code will break. So, "await" will come after each step. 
    Then function will be async. await and async go hand-in-hand.
    
    Function defined like func() can be defined like this also: ()=> - anonymous function
    */
/* (browser) - this will be treated as normal "browser" string value
    ({browser}) - this will be treated as playwright fixture*/

test('First Playwright test',async ({browser,page})=>     //2 arguments - test case name & test case function
{
    await page.goto("https://qa.aerfinity.acumenaviation.in/")
});

//const context lines not required if you indicate "page" in async, like above
//only keyword is to run single test from entire project folder

test('Second Playwright test',async ({browser})=>
{
    //create chrome instance
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
}
);