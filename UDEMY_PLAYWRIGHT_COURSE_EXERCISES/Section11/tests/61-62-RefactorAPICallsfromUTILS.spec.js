const { test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginPayLoad = {userEmail:"chinmayshiv@gmail.com",userPassword:"Chinmay123&"}
const orderPayLoad = {orders:[{country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5"}]}
let response;

test.beforeAll(async()=>
{
    const apiContext = await request.newContext();
    const apiutils = new APIUtils(apiContext,loginPayLoad);
    response = await apiutils.createOrder(orderPayLoad);
})

//create order is success
test('Place the order',async({page})=>
{
    console.log("Token:", response.token);
    await page.addInitScript(value=>
        {window.localStorage.setItem('token',value);
            
        },response.token);
    await page.goto("https://rahulshettyacademy.com/client/");
    const token = await page.evaluate(() => localStorage.getItem("token"));
    console.log("Token in Local Storage:", token);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for(let i=0;i<await rows.count();++i)
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(response.orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
}
)