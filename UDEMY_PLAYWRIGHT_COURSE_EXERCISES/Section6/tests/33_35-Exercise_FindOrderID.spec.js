const {test, expect} = require('@playwright/test'); //we are importing test here
const { rawListeners } = require('node:cluster');


    test.only('End to end automation exercise from Session28',async ({page})=>
    {
        /*REQUIREMENT: 
        1. Complete the order cycle done in 28. Exercise...
        2. Get the order id
        3. Go to order history page and find that order id
        4. Click on the view button of that order id row*/

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
        const product = 'adidas original';
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

        //Order History part
        const ordericon = page.locator("//button[contains(@routerlink,'myorders')]");

        //Order Details part
        const orderdetailsid = page.locator("//div[contains(@class,'col-text')]");
        const orderdetailsbillingemail = page.locator("(((//div[contains(@class,'row')])[3]/div)[1]/div/p)[1]");
        const orderdetailsdeliveryemail = page.locator("(((//div[contains(@class,'row')])[3]/div)[2]/div/p)[1]");
        const orderdetailsbillingcountry = page.locator("(((//div[contains(@class,'row')])[3]/div)[1]/div/p)[2]");
        const orderdetailsdeliverycountry = page.locator("(((//div[contains(@class,'row')])[3]/div)[2]/div/p)[2]");
        const orderdetailsproductname = page.locator("(//div[contains(@class,'artwork-card-info')]/div)[1]");
        const orderdetailsproductprice = page.locator("((//div[contains(@class,'artwork-card-info')]/div)[2]/div)[2]");

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
        const productprice = Number((await page.locator("//div[contains(@class,'cart')]/ul/li/div/div[2]/p").textContent()).replace(/[^\d]/g, '')); //taken from MY Cart
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
        const actualorderID = (await orderid.textContent()).replace(/\|/g,'').trim();
        //I have to make this to compare correct order ID ahead

        //CHECKING ORDER ID AND DETAILS IN ORDER HISTORY
        await ordericon.click();
        await page.locator("tbody").waitFor();
        
        const rows = page.locator("//tbody/tr");
        const rowsCount = await rows.count();
        const currentDate = new Date().toDateString().substring(0,10);

        for(let i=0;i<rowsCount;i++)
        {
            const row = rows.nth(i);
            const historyorderid = (await row.locator("th").textContent()).trim();
            
            if(historyorderid === actualorderID)
            {
                console.log("Correct Order ID found!: "+historyorderid);
                const historyorderdate = (await row.locator("td").nth(3).textContent()).trim();
                console.log("Order date: " + historyorderdate);

                if(historyorderdate.includes(currentDate))
                {
                    console.log("Date is correct");
                }
                else
                {
                    console.log("Date mismatch!");
                }
                // Click VIEW button of SAME row
                await row.locator("button").first().click();
                await page.waitForTimeout(6000);
                break;
            }
        }

        console.log("NOW LET'S CHECK IN ORDER DETAILS");
        await expect(orderdetailsid).toContainText(actualorderID);
        await expect(orderdetailsbillingemail).toHaveText(dataemail);
        await expect(orderdetailsdeliveryemail).toHaveText(dataemail);
        await expect(orderdetailsbillingcountry).toContainText(country);
        await expect(orderdetailsdeliverycountry).toContainText(country);
        await expect(orderdetailsproductname).toContainText(product, { ignoreCase: true });
        const orderdetailsprice = Number((await orderdetailsproductprice.textContent())
        .replace(/[^\d]/g, ''));
        expect(orderdetailsprice).toBe(productprice);
    }
);