class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // XPath locators as requested
    this.usernameInput = page.locator('(//input)[1]');
    this.passwordInput = page.locator('(//input)[2]');
    this.loginButton = page.locator('//button[contains(@type,\'submit\')]');
  }

  /**
   * Fill username field
   * @param {string} username
   */
  async enterUsername(username) {
    await this.usernameInput.fill(username);
  }

  /**
   * Fill password field
   * @param {string} password
   */
  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  /**
   * Click login button
   */
  async clickLogin() {
    await this.loginButton.click();
  }

  /**
   * Perform login
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }
}

module.exports = LoginPage;

