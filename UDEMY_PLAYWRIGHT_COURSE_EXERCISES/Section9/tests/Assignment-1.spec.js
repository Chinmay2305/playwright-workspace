const {test, expect} = require('@playwright/test'); //we are importing test here

test('Section9-Assignment1',async ({page})=>
{
    /*REQUIREMENT: Create a brand new event from the admin panel, then complete a booking for 
    that event, and finally verify the seat count drops by exactly 1.

    Setup
        - BASE_URL = https://eventhub.rahulshettyacademy.com
        - Credentials: < Create your own credentials>
        - Write a reusable login(page) helper function — you will call it at the start of the test
        
    Steps
        Step 1 — Login
        - Navigate to /login
        - Fill email field (locate by placeholder you@email.com)
        - Fill password field (locate by label Password)
        - Click the login button (locate by id #login-btn)
        - Assert: link with text Browse Events → is visible (confirms login success)
        
        Step 2 — Create a new event
        - Navigate to /admin/events
        - Generate a unique event title using Test Event ${Date.now()} — store this in a variable, you will need it throughout the test
        - Fill Title field (locate by id #event-title-input)
        - Fill Description textarea (locate using #admin-event-form textarea)
        - Fill City field (locate by label City)
        - Fill Venue field (locate by label Venue)
        - Fill Event Date & Time field (locate by label Event Date & Time) — use your futureDateValue() helper
        - Fill Price ($) field (locate by label Price ($)) — use any number e.g. 100
        - Fill Total Seats field (locate by label Total Seats) — use 50
        - Click the submit button (locate by id #add-event-btn)
        - Assert: toast message Event created! is visible
        
        Step 3 — Find the event card and capture seats
        - Navigate to /events
        - Get all event cards (locate by data-testid="event-card")
        - Assert the first card is visible (confirms page loaded)
        - From all cards, filter for the one that contains your event title text
        - Assert the matched card is visible (timeout 5 seconds)
        - Read the seat count text from that card (locate element containing text seat, parse integer from its inner text) — store this as seatsBeforeBooking
        
        Step 4 — Start booking
        - On the matched event card, click the Book Now button (locate by data-testid="book-now-btn" inside the card)
        
        Step 5 — Fill booking form
        - Assert: element with id #ticket-count has text 1 (default quantity)
        - Fill Full Name (locate by label Full Name)
        - Fill Email (locate by id #customer-email)
        - Fill Phone (locate by placeholder +91 98765 43210)
        - Click the confirm button (locate by CSS class .confirm-booking-btn)
        
        Step 6 — Verify booking confirmation
        - Locate the booking reference element (locate by CSS class .booking-ref, take .first())
        - Assert it is visible
        - Read its inner text, trim it — store as bookingRef
        
        Step 7 — Verify in My Bookings
        - Click the link View My Bookings
        - Assert: URL is BASE_URL/bookings
        - Get all booking cards (locate by id #booking-card)
        - Assert the first booking card is visible
        - Filter booking cards for the one that contains an element with class .booking-ref matching your bookingRef text
        - Assert that matched card is visible
        - Assert that matched card contains your eventTitle text
        
        Step 8 — Verify seat reduction
        - Navigate back to /events
        - Assert the first event card is visible
        - Filter cards again using hasText: eventTitle
        - Assert the card is visible
        - Read the seat count text again (same as Step 3) — store as seatsAfterBooking
        - Assert: seatsAfterBooking === seatsBeforeBooking - */

        //data for testing
        const url = 'https://eventhub.rahulshettyacademy.com';
        const email = page.getByPlaceholder('you@email.com');
        const password = page.getByLabel('password')
        const dataemail = 'chinmay230587@gmail.com';
        const datapassword = 'Chinmay5345&';
        const signinbtn = page.locator("//button[contains(@id,'login-btn')]");
        const admindd = page.locator("(//div[contains(@class,'md:flex')]/div/button)[1]");
        const adminevents = page.locator("(//div[contains(@class,'absolute')])[1]/a[1]");
        const date = new Date();
        
        const titlefield = page.locator("//input[contains(@id,'event-title-input')]");
        const title = "Test Event"+date;
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
        const totalseats = "5";
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
        const eventscount = await page.locator("(//div[contains(@class,'absolute top-3 left-3')])").count();
        await console.log(eventscount);

        const latesteventseats = await page.locator("(//div[contains(@class,'flex items-center justify-between pt-3')])["+eventscount+"]/div/span").textContent();
        const seatsavailable = parseInt(latesteventseats.match(/\d+/)[0]);
        console.log(seatsavailable);

        const bookbutton = await page.locator("(//div[contains(@class,'flex items-center justify-between pt-3')])["+eventscount+"]/a");
       
        //STEP 4 - book 1 seat
        await bookbutton.click();

        const fullname = page.locator("(//input)[1]");
        const bookingemail = page.locator("(//input)[2]");
        const phone = page.locator("(//input)[3]");
        const confirmbookingbtn = page.locator("//form[contains(@class,'space-y-4')]/button");
        const dataname = "Chinmay Agrawal";
        const dataphone = "8238997664";
        await fullname.fill(dataname);
        await bookingemail.fill(dataemail);
        await phone.fill(dataphone);
        await confirmbookingbtn.click();

        //STEP 5 - now checking number of bookings left and verify if they have become 1 less
        await events.click();
        const latesteventseats2 = await page.locator("(//div[contains(@class,'flex items-center justify-between pt-3')])["+eventscount+"]/div/span").textContent();
        const seatsavailable2 = parseInt(latesteventseats2.match(/\d+/)[0]);
        console.log(seatsavailable2);
        expect(seatsavailable2).toBe(seatsavailable - 1);
    }
);