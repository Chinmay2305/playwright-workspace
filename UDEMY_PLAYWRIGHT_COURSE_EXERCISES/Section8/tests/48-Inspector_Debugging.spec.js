import {test,expect} from '@playwright/test';

test('Playwright Special Locators',async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button",{name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole()
}
)

//Run with the command npx playwright test 48-Inspector_Debugging.spec.js --debug
//This will open the inspector window with running window. Use it to run at own pace 
// and see where error is coming or find any element locator