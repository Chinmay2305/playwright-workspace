// LoginPage - Page Object Model for the login page
class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Using XPath locators as requested
    this.usernameInput = page.locator('xpath=//input[1]');
    this.passwordInput = page.locator('xpath=//input[2]');
    this.loginButton = page.locator('xpath=//button');
  }

  async enterUsername(username) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    // Click the login button and do not block on navigation because
    // the app may or may not navigate depending on credentials.
    // Tests should assert navigation via expect(page).toHaveURL(...) when needed.
    await this.loginButton.click();
  }

  /**
   * Convenience method to perform full login flow
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }
}

module.exports = LoginPage;

