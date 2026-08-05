const { expect } = require('@playwright/test');

class LoginPage {

    constructor(page)
    {

        this.page = page;

        // Login Controls
        this.txtUsername = page.locator("#UsernameEmail");
        this.txtPassword = page.locator("#Password");
        this.btnLogin = page.getByRole('button', { name: 'Log in' });

        // Validation Messages
        this.lblEmptyUsername = page.locator('[data-valmsg-for="UsernameEmail"] span');
        this.lblEmptyPassword = page.locator("#Password-error");
        this.lblLoginError = page.locator("div.validation-summary-errors.text-danger");
    }

    async enterUsername(username) {
        await this.txtUsername.fill(username);
    }

    async enterPassword(password) {
        await this.txtPassword.fill(password);
    }

    async clickLogin() {
        await this.btnLogin.click();
    }

    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.btnLogin.click();

    }

    // Generic verification for any field error
    async verifyFieldError(locator, expectedMessage) {
        await expect(locator).toHaveText(expectedMessage);
    }

    // Generic verification for login error
    async verifyLoginError(expectedMessage) {
        await expect(this.lblLoginError).toHaveText(expectedMessage);
    }
}

module.exports = LoginPage;
