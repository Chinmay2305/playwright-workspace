const {test, expect} = require('@playwright/test'); //we are importing test here
const { rawListeners } = require('node:cluster');


    test.only('End to end automation exercise from Session28',async ({page})=>
    {
        //data for testing
        const datafname = 'Chinmay';
        const datalname = 'Agrawal';
        const dataemail = 'chinmayshiv@gmail.com';
        const dataphone = '8238997664';
        const datapassword = 'Chinmay123&';

        //register page locators defined
        const fName = page.locator('#firstName');
        const lName = page.locator('#lastName');
        const mobile = page.locator('#userMobile');

        //login page locators defined
        const email = page.getByPlaceholder("email@example.com");
        const password = page.getByPlaceholder("enter your passsword");
        const confirmpassword=page.locator('#confirmPassword');
        const checkbox = page.locator("//input[contains(@type,'checkbox')]");
        const loginandsignupbtn = page.getByRole('button',{name:"login"});
        const registerbtn = page.locator("//p[contains(@class,'login-wrapper-footer-text')]/a");

        //product to add
        const product = 'Zara coat 3';
        const productNames = page.locator('.card-body');
        const carticon = page.getByRole('button',{name:"Cart"});
        const cartitemname = page.locator("(//div[contains(@class,'cart')])[2]/h3");
        const checkoutbutton = page.locator("//div[contains(@class,'subtotal')]/ul/li[3]/button");
        const checkoutitemname = page.locator("div.item__title");

        //shipping locators and info
        const shippingemailgreyed = page.locator("//div[contains(@class,'user__name')]/label");
        const shippingemail = page.locator("//div[contains(@class,'details__user')]/div/input");
        const shippingcountry = page.locator("//div[contains(@class,'details__user')]/div/div/div/input");
        const country = "India";
        const countryoptions = page.locator(".ta-results");
        const placeorderbutton = page.locator(".action__submit");
        const orderid = page.locator("//tr[contains(@class,'ng-star-inserted')]/td/label");

        await page.goto("https://rahulshettyacademy.com/client");
        await email.fill(dataemail);
        await password.fill(datapassword);
        await loginandsignupbtn.click();
        await page.waitForLoadState('networkidle');
    
        //CLICK ON WANTED PRODUCT'S ADD TO CART BUTTON DIRECTLY IN SHORT WAY USING
        //OTHER KINDS OF LOCATORS
        await productNames.filter({hasText:product})
        .getByRole("button",{name:"Add To Cart"})
        .click();
        await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
        //there are multiple buttons on the page with "Cart" so, we first took the
        //parent class with "listitem" so, it will catch the button only within that.

        //Now, verify if the product is there in the cart
        await expect(page.getByText(product)).toBeVisible();
        await page.getByRole("button",{name:"Checkout"}).click();

        await page.getByPlaceholder("Select Country").pressSequentially("ind");
        await page.getByRole("button",{name:"India"}).nth(1).click();

        await page.getByText("PLACE ORDER").click();

        await expect(page.getByText("Thankyou for the order.")).toBeVisible();
        console.log("The order-id is: "+(await orderid.textContent()))
    }
);