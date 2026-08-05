const{test} = require('@playwright/test')
const LoginPage = require('../../pages/LoginPage.js')
const config = require('../../config/config.js')
const loginData = require('../../testdata/loginData.json');

test("Wrong Password", async ({ page }) =>
{
    await page.goto(config.url);
    const loginPage = new LoginPage(page);
    await loginPage.login(loginData.wrongPassword.username,loginData.wrongPassword.password);
    await loginPage.verifyLoginError("The password was incorrect.");
});

test("Wrong Username", async ({ page }) =>
{
    await page.goto(config.url);
    const loginPage = new LoginPage(page);
    await loginPage.login(loginData.wrongUsername.username,loginData.wrongUsername.password);
    await loginPage.verifyLoginError("The username was not found.");
});

test("Empty Username", async ({ page }) =>
{
    await page.goto(config.url);
    const loginPage = new LoginPage(page);
    await loginPage.login("",loginData.validLogin.password);
    await loginPage.verifyFieldError(loginPage.lblEmptyUsername,"The Username or Email field is required.");
});

test("Empty Password", async ({ page }) =>
{
    await page.goto(config.url);
    const loginPage = new LoginPage(page);
    await loginPage.login(loginData.validLogin.username,"");
    await loginPage.verifyFieldError(loginPage.lblEmptyPassword,"The Password field is required.");
});

test.only("Valid Login - Viren", async ({ page }) =>
{
    await page.goto(config.url);
    const loginPage = new LoginPage(page);
    await loginPage.login(loginData.validAdminLogin.username,loginData.validAdminLogin.password);
    await loginPage.verifyDashboard(loginData.validAdminLogin.role,loginData.validAdminLogin.cards);
    await loginPage.verifyOrganizationCount();
});

test("Valid Login - Ank", async ({ page }) =>
{
    await page.goto(config.url);
    const loginPage = new LoginPage(page);
    await loginPage.login(loginData.validLogin.username,loginData.validLogin.password);
    await loginPage.verifyDashboard(loginData.validLogin.role,loginData.validLogin.cards);
});