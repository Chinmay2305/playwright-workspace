const {test, expect} = require('@playwright/test'); //we are importing test here


test.only('Session 22-AssertionsForDropDown&RadioButton', async({page})=>
{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginregisterBtn = page.locator('#login');
    const dropdown = page.locator("select.form-control");
    const documentlink = page.locator("[href*='documents-request']");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    //check attribute value of blinking text to verify if a text is blinking or not
    await expect(documentlink).toHaveAttribute("class","blinkingText");
}
)

/*await is required only when you are performing action
await expect(page.locator(".radiotextsty").last()).toBeChecked(); 
- action is performed at the end - tobeChecked(), outside so await is also outside

expect(await page.locator("#terms").isChecked()).toBeFalsy();
- action is performed inside the brackets - isChecked() so, await is inside
*/