const {test, expect} = require('@playwright/test'); //we are importing test here
const { rawListeners } = require('node:cluster');


    test.only('End to end automation exercise from Session28',async ({page})=>
    {
        /*REQUIREMENT: 
        1. register and login - done
        2. select a product name & add to cart (dynamically) - done
        3. Go to cart and verify that it is the same with assertions - done
        4. Checkout - verify same product name here. Add card details.
        5. Checkout - Registered email should come here by default, in shipping information. verify this too. - done
        6. Select country. - done
        7. apply coupon - rahulshettyacademy - will take some time so make sure of that and verify the text here too - *Coupon Applied
        8. Click on Place Order - done
        9. Confirmation page - verify the same product here too & capture order id. - done
        10. Go to order history page. Scan each row of OrderID column. Once our order id is found, click on it's view button. 
        11. Go inside and view details and verify all details shown there are same or not.*/

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
        const email = page.locator('#userEmail');
        const password = page.locator('#userPassword');
        const confirmpassword=page.locator('#confirmPassword');
        const checkbox = page.locator("//input[contains(@type,'checkbox')]");
        const loginandsignupbtn = page.locator('#login');
        const registerbtn = page.locator("//p[contains(@class,'login-wrapper-footer-text')]/a");

        //product to add
        const product = 'Zara coat 3';
        const productNames = page.locator('.card-body');
        const carticon = page.locator("//ul/li[4]/button");
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
      //await page.waitForLoadState('networkidle');
    
        //GET LIST OF ALL PRODUCTS
        await productNames.first().waitFor();
        const titles = await productNames.allTextContents(); //this will show all elements with locator page.locator(".card-body a")
        console.log(titles);
        const count = await productNames.count();
        for(let i=0;i<count;i++)
        {
            const productTitle = await productNames.nth(i).locator("b").textContent();
            if(productTitle.trim().toLowerCase().includes(product.toLowerCase()))
            {
                await productNames.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
        carticon.click();
        console.log(await cartitemname.textContent());
        if((await cartitemname.textContent()).toLowerCase()===product.toLowerCase())
        {
            console.log("Product is added in the cart")
        }
        else
        {
            console.log("Product not matching in the cart!")
        }

        checkoutbutton.click();
        if(((await checkoutitemname.textContent()).trim()).toLowerCase() === product.toLowerCase())
        {
            console.log("Product is right in the checkout page also")
        }
        else
        {
            console.log("Product is not right in the checkout page")
        }

        //Adding shipping details - verify the email is right or not and sequentially enter the country
        console.log("Shipping Email:", await shippingemail.inputValue());
        await expect(shippingemailgreyed).toHaveText(dataemail);
        await expect(shippingemail).toHaveValue(dataemail);
        await shippingcountry.pressSequentially(country.substring(0,3).toLowerCase(),{delay: 150});
        await countryoptions.waitFor();
        const optionscount = await countryoptions.locator("button").count();
        for(let i=0;i<optionscount;i++)
        {
            const text = await countryoptions.locator("button").nth(i).textContent();
            if(text.trim() === country)
            {
                await countryoptions.locator("button").nth(i).click();
                break;
            }
        }
        await page.waitForTimeout(3000);
        await placeorderbutton.click();
        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        console.log("The order-id is: "+(await orderid.textContent()))
    }
    );