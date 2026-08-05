const { test, expect, request} = require('@playwright/test');
const loginPayLoad = {userEmail:"chinmayshiv@gmail.com",userPassword:"Chinmay123&"}
const orderPayLoad = {orders:[{country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5"}]}
let token;
let orderId;

test.beforeAll(async()=>
{
    //LOGIN API
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data:loginPayLoad
    });
    
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJSON = await loginResponse.json();
    token = loginResponseJSON.token;
    console.log(token);

    //ORDER API
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data:orderPayLoad,
        headers:{
            'Authorization':token,
            'Content-Type':'application/json'
        }
    });
    expect(orderResponse.ok()).toBeTruthy();
    const orderResponseJSON = await orderResponse.json();
    console.log(orderResponseJSON);
    orderId = orderResponseJSON.orders[0];
});

test.only('Session56',async ({page})=>
    {
        page.addInitScript(value => {
            window.localStorage.setItem('token',value);
        },token); /*Here, I have not landed on login page. It skipped the login part and directly logged in using API*/
        
        //product to add
        await page.goto("https://rahulshettyacademy.com/client/")
        await page.locator("//button[contains(@routerlink,'myorders')]").click();
        await page.locator("tbody").waitFor();
        const rows = page.locator("tbody tr");

        for(let i=0;i<await rows.count();++i)
        {
            const roworderId = await rows.nth(i).locator("th").textContent();
            if(orderId.includes(roworderId))
            {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
        const orderIdDetails = await page.locator(".col-text").textContent();
        await page.pause();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();
    });