/*Till now we have seen that login can be done by providing cookie in session storage. But sometimes, login can be complicated.
Till now, there was only 1 token in local storage but some mega projects like banking may have multiple key-value pairs in a complex setting
For such tedious task, there is a workaround - First, Login via UI. Then collect information of add to cart, go to cart, confirm order details and history
Excellent Method - Storage State - After login, it will copy all content - cookies, tokens, etc - Copy all these into json file. Create instance with this json file.
*/

const { test, expect} = require('@playwright/test');
let webContext;

test.beforeAll(async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("chinmay230587@gmail.com");
    await page.locator("#userPassword").fill("Chinmay123&");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path:'state.json'});

    //Invoke a browser by injecting this state.json file
    await browser.newContext({storageState:'state.json'});
    webContext=await browser.newContext({storageState:'state.json'});
})

test('Client App Login',async()=>
{
    const email="";
    const productname = 'Zara Coat 4';
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for(let i=0;i<count;++i)
    {
        if(await products.nth(i).locator("b").textContent() === productname)
        {
            //add to cart
            await products.nth(i).locator("text=Add to Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('Zara Coat 4')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
     
}
)