const {test, expect} = require('@playwright/test'); //we are importing test here


test('Testing Exercise Solution from Session19',async ({page})=>
{    
    //data for testing
    const datafname = 'Chinmay';
    const datalname = 'Agrawal';
    const dataemail = 'chinmay230587@gmail.com';
    const dataphone = '8238997664';
    const datapassword = 'Chinmay123&';

    //login page locators defined
    const email = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginregisterBtn = page.locator('#login');
    const productNames = page.locator("//div[@class='card-body']//h5/b");

    await page.goto("https://rahulshettyacademy.com/client");
    await email.fill(dataemail);
    await password.fill(datapassword);
    await loginregisterBtn.click();
  //  await page.waitForLoadState('networkidle');
   /*FIRST KIND OF WAIT:  dynamically-means it will wait till network comes to idle 
   state or till everything on UI comes up*/
    
 
    //GET LIST OF ALL PRODUCTS
    await page.locator(".card-body b").first().waitFor(); /*SECOND KIND OF WAIT*/
    const titles = await productNames.allTextContents(); //this will show all elements with locator page.locator(".card-body a")
    console.log(titles);

    //GET 1st product - Exercise asked in the end of lecture 17.
    console.log("First product is: "+await productNames.first().textContent());
    console.log("Third product is: "+await productNames.nth(2).textContent());
}
);