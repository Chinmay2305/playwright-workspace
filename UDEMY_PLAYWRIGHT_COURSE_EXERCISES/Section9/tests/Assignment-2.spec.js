const {test, expect} = require('@playwright/test'); //we are importing test here

test('Section9-Assignment2',async ({page})=>
{
    test.setTimeout(120000);
    /*REQUIREMENT: 2 seperate tests
    Book 1 ticket - It should show "Eligible for refund"
    Book 3 tickets - It should show "Not eligible for refund"
    Verify the spinner appears and disappears before showing the message*/

    //data for testing
    const url = 'https://eventhub.rahulshettyacademy.com';
    const email = page.getByPlaceholder('you@email.com');
    const password = page.getByLabel('password')
    const dataemail = 'chinmay230587@gmail.com';
    const datapassword = 'Chinmay5345&';
    const signinbtn = page.locator("//button[contains(@id,'login-btn')]");
    const admindd = page.locator("(//div[contains(@class,'md:flex')]/div/button)[1]");
    const adminevents = page.locator("(//div[contains(@class,'absolute')])[1]/a[1]");
    const currentDateTime = new Date().toISOString().slice(0, 16);
    
    const titlefield = page.locator("//input[contains(@id,'event-title-input')]");
    const title = "1-3 seats?"+currentDateTime;
    const descfield = page.locator("(//form[contains(@id,'admin-event-form')]/div/div)[2]/textarea");
    const desc = "Description testing";
    const cityfield = page.locator("//input[@id=//label[text()='City']/@for]");
    const city = "Nashik";
    const venuefield = page.locator("//input[contains(@id,'venue')]");
    const venue = "Test Auditorium, 1-B, Vrundavan Park, Sama Road";
    const datetimefield = page.locator("//input[contains(@id,'event-date-&-time')]");
    const datetime = "2026-06-01T20:40";
    const pricefield = page.locator("//input[contains(@id,'price-($)')]");
    const price = "5000";
    const totalseatsfield = page.locator("//input[contains(@id,'total-seats')]");
    const totalseats = "10";
    const addbutton = page.locator("//form/div[contains(@class,'flex items-center')]/button");

    const events = page.locator("(//div[contains(@class,'hidden md:flex items-center gap-1')])/a[2]");

    //STEP 1 - login
    await page.goto(url);
    await email.fill(dataemail);
    await password.fill(datapassword);
    await signinbtn.click();
    await expect(page.locator("((//div[contains(@class,'sm:flex-row')])[1]/a)[1]/span")).toHaveText('Browse Events →');

    //STEP 2 - add event
    await admindd.click();
    await adminevents.click();
    await titlefield.fill(title);
    await descfield.fill(desc);
    await cityfield.fill(city);
    await venuefield.fill(venue);
    await datetimefield.fill(datetime);
    await pricefield.fill(price);
    await totalseatsfield.fill(totalseats);
    await addbutton.click();

    //STEP 3 - get seats count
    await events.click();

    //STEP 4 - do 2 bookings - 1 seat and 3 seats
    const addticketbutton = page.locator("(//form[contains(@class,'space-y-4')]/div/div/button)[2]");
    const fullname = page.locator("(//input)[1]");
    const bookingemail = page.locator("(//input)[2]");
    const phone = page.locator("(//input)[3]");
    const confirmbookingbtn = page.locator("//form[contains(@class,'space-y-4')]/button");
    const dataname = "Chinmay Agrawal";
    const dataphone = "8238997664";

    for(let i=1;i<=2;i++)
    {
        const bookbutton = page.locator(`//div[contains(@class,'flex-col')][.//h3[text()='${title}']]//a[@data-testid='book-now-btn']`);

        await bookbutton.click();
        await expect(confirmbookingbtn).toBeVisible();
        if(i===2)
        {
            for(let j=1;j<=2;j++)
            {
                await addticketbutton.click();
            }
        }
        await fullname.fill(dataname);
        await bookingemail.fill(dataemail);
        await phone.fill(dataphone);
        await confirmbookingbtn.click();
        await expect(page.getByText('Booking Confirmed! 🎉')).toBeVisible();

        //STEP 5 - Check elgibility for refund
        const mybookings = page.locator("(//div[contains(@class,'hidden md:flex items-center gap-1')])/a[3]");
        await mybookings.click();
        const viewdetails = page.locator("(//div[contains(@class,'flex-wrap')])[3]/a/button");
        await viewdetails.click();
        
        const numberofticketsbooked = page.locator("((//div[contains(@class,'space-y-4')]/div)[3]/div/div[1]/span)[2]");
        await expect(numberofticketsbooked).toBeVisible();
        const ticketscount = parseInt((await numberofticketsbooked.textContent()).match(/\d+/)[0]);
 
        const refund = page.locator("(//div[contains(@class,'space-y-4')]/div)[4]/button");
        const spinner = page.locator("//div[contains(@id,'refund-spinner')]");
        const refundmessage = page.locator("//div[contains(@id,'refund-result')]/span");
        await refund.click();
        await spinner.waitFor({ state: 'visible' });
        await spinner.waitFor({ state: 'hidden' });

        if(i===1)
        {
            await expect(refundmessage).toHaveText('Eligible for refund. Single-ticket bookings qualify for a full refund.');
        }
        else if(ticketscount===3)
        {
            await expect(refundmessage).toHaveText('Not eligible for refund. Group bookings (3 tickets) are non-refundable.');
        }

        if(i<2)
        {
            //await page.getByRole('button', { name: 'Browse More Events' }).click();
            await page.goto('https://eventhub.rahulshettyacademy.com/events');
        }
    }            
}
);