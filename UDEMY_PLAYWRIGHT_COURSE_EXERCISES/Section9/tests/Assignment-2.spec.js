const { test, expect } = require('@playwright/test');
test.setTimeout(120000);

/*REQUIREMENT:
 2 seperate tests 
 Book 1 ticket - It should show "Eligible for refund" 
 Book 3 tickets - It should show "Not eligible for refund" 
 Verify the spinner appears and disappears before showing the message*/

// ============================================================================
// Test Data
// ============================================================================

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

const USER = {
    email: 'chinmay230587@gmail.com',
    password: 'Chinmay5345&',
    fullName: 'Chinmay Agrawal',
    phone: '8238997664'
};

const EVENT = {
    description: 'Description testing',
    city: 'Nashik',
    venue: 'Test Auditorium',
    date: '2027-06-01T20:40',
    price: '500',
    totalSeats: '10'
};

// ============================================================================
// Helper Methods
// ============================================================================

async function login(page) {

    await page.goto(`${BASE_URL}/login`);

    await page.getByPlaceholder('you@email.com').fill(USER.email);
    await page.getByLabel('Password').fill(USER.password);
    await page.locator('#login-btn').click();

//    await expect(page.getByText('Browse Events')).toBeVisible();
}

async function createEvent(page, eventTitle) {

    await page.goto(`${BASE_URL}/admin/events`);

    await page.locator('#event-title-input').fill(eventTitle);

    await page.locator('#admin-event-form textarea').fill(EVENT.description);

    await page.getByLabel('City').fill(EVENT.city);

    await page.getByLabel('Venue').fill(EVENT.venue);

    await page.getByLabel('Event Date & Time')
        .fill(EVENT.date);

    await page.getByLabel('Price ($)')
        .fill(EVENT.price);

    await page.getByLabel('Total Seats')
        .fill(EVENT.totalSeats);

    await page.locator('#add-event-btn').click();
    await page.pause();

    await expect(page.getByText('Event created!')).toBeVisible();
}

async function openCreatedEvent(page, eventTitle) {

    await page.goto(`${BASE_URL}/events`);

    const eventCard = page
        .getByTestId('event-card')
        .filter({ hasText: eventTitle });

    await expect(eventCard).toBeVisible();

    await eventCard.getByTestId('book-now-btn').click();
}

async function bookTickets(page, ticketCount) {

    const plusButton = page.locator('(//button[@type="button"])[2]');

    for (let i = 1; i < ticketCount; i++) {
        await plusButton.click();
    }

    await page.getByLabel('Full Name').fill(USER.fullName);

    await page.locator('#customer-email').fill(USER.email);

    await page.getByPlaceholder('+91 98765 43210')
        .fill(USER.phone);

    await page.locator('.confirm-booking-btn').click();

    await expect(page.getByText('Booking Confirmed! 🎉')).toBeVisible();
}

async function verifyRefund(page, expectedMessage) {

    await page.getByRole('link', {
        name: 'View My Bookings'
    }).click();

    await page.getByRole('button', {
        name: 'View Details'
    }).first().click();

    const refundButton = page.getByRole('button', {
        name: /refund/i
    });

    const spinner = page.locator('#refund-spinner');

    const result = page.locator('#refund-result span');

    await refundButton.click();

    // Spinner should appear

    await expect(spinner).toBeVisible();

    // Spinner should disappear

    await expect(spinner).toBeHidden();

    // Refund message

    await expect(result).toHaveText(expectedMessage);
}

// ============================================================================
// Test 1
// ============================================================================

test('Book 1 ticket - Eligible for refund', async ({ page }) => {

    const eventTitle = `Refund Test ${Date.now()}`;

    await login(page);

    await createEvent(page, eventTitle);

    await openCreatedEvent(page, eventTitle);

    await bookTickets(page, 1);

    await verifyRefund(
        page,
        'Eligible for refund. Single-ticket bookings qualify for a full refund.'
    );
});

// ============================================================================
// Test 2
// ============================================================================

test('Book 3 tickets - Not eligible for refund', async ({ page }) => {

    const eventTitle = `Refund Test ${Date.now()}`;

    await login(page);

    await createEvent(page, eventTitle);

    await openCreatedEvent(page, eventTitle);

    await bookTickets(page, 3);

    await verifyRefund(
        page,
        'Not eligible for refund. Group bookings (3 tickets) are non-refundable.'
    );
});