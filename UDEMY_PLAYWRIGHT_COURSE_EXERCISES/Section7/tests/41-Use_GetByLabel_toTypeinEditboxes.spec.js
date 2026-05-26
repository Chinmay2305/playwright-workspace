import {test, expect} from '@playwright/test';

test('Playwright Special Locators', async ({ page })=>
{
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button",{name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name: "Shop"}).click();
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();

    //how to enter in textbox using getByLabel
    /*when does this work - when editbox is also in the <label> html:
    <label>Password <input type="password"/> </label>

    But not when it is not the label tag:
    <label>Password</label> <input type="password"/>

    Another case where it will work even if textbox is outside label html:
    When there is a linkage using id. They are associated here.
    <label for="exampleInputPassword">Password</label>
    <input id="exampleInputPassword" type="password"/>
    */
});