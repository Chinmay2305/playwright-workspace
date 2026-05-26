const {test, expect} = require('@playwright/test'); //we are importing test here


test('Session 21-DropDown&RadioButton', async({page})=>
{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginregisterBtn = page.locator('#login');
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await page.pause();
}
)