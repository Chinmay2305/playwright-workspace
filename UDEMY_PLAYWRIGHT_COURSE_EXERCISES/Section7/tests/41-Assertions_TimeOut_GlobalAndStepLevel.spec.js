import {test, expect} from '@playwright/test';

test.only('Playwright Special Locators', async ({ page })=>
{
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", { name: "Submit" }).click();
//    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    //customzied timeout - will wait for 10 seconds by ignoring the default timeout
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10000});
});

test('@Web UI Controls', async ({ page })=>
{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");
});

test('@Child Windows hadl', async ({ browser })=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentlink = page.locator("[href*='documents-request']");

    const[newPage] = await Promise.all(
    [
            context.waitforEvent('page'),
            documentLink.click(),
    ])

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
});

test('@Web Browser Context-Validating Error Login', async ({ browser })=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    page.on('request',request=>console.log(request.url()));
    page.on('response',response=>console.log(response.url(),response.status()));
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());

    //css
    await username.fill("rahulshetty");
    await page.locator("[type='password']").fill("Learning@1224e2");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    //type-fill
    await username.fill("");
    await username.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});