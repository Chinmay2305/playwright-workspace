const {test, expect} = require('@playwright/test'); //we are importing test here


test('Testing Exercise from Session17',async ({browser})=>
{
    //create chrome instance
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    console.log(await page.title())

    //registeration page locators defined
    const fName = page.locator('#firstName');
    const lName = page.locator('#lastName');
    const email = page.locator('#userEmail');
    const phone = page.locator('#userMobile');
    const password = page.locator('#userPassword');
    const confirmpassword = page.locator('#confirmPassword');
    const checkbox = page.locator("[type*='checkbox']");
    const loginregisterBtn = page.locator('#login');

    //data for testing
    const datafname = 'Chinmay';
    const datalname = 'Agrawal';
    const dataemail = 'chinmay230587@gmail.com';
    const dataphone = '8238997664';
    const datapassword = 'Chinmay123&';

    //login page locators defined
    const signupBtn = page.locator("[class*='login-wrapper-footer-text']");
    const productNames = page.locator("//div[@class='card-body']//h5/b");

    //Go to Registeration page
/*    await signupBtn.click();
    await fName.type(datafname);
    await lName.type(datalname);
    await email.type(dataemail)
    await phone.type(dataphone)
    await password.type(datapassword)
    await confirmpassword.type(datapassword)
    await checkbox.check();
    await loginregisterBtn.click();

    await Promise.all([page.waitForURL('**
    /auth/login'),page.locator("//button").click()]);*/

    //Now login    
    await email.type(dataemail);
    await password.type(datapassword);
    await loginregisterBtn.click();

    //GET LIST OF ALL PRODUCTS
    await productNames.first().waitFor();
    const titles = await productNames.allTextContents(); //this will show all elements with locator page.locator(".card-body a")
    console.log(titles);

    //GET 1st product - Exercise asked in the end of lecture 17.
    console.log("First product is: "+await productNames.first().textContent());
    console.log("Third product is: "+await productNames.nth(2).textContent());
}
);