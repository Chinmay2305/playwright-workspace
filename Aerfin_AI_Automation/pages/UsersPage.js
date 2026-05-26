class UsersPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation: settings -> users
    this.settingsLink = page.locator("(//div[contains(@class,'MuiDrawer-root')]/div/ul/a)[7]");
    this.usersFirstLink = page.locator("((//div[contains(@class,'MuiBox-root')])[4]/nav/ul/a)[1]");

    // Add user button
    this.addButton = page.locator("((//main[contains(@class,'MuiBox-root')])[2]/div/div/div)[1]/div[2]/button[1]");

    // Popup form inputs
    this.nameInput = page.locator("(//div[contains(@class,'MuiGrid2-root')]/div/div/div/input)[1]");
    this.emailInput = page.locator("(//div[contains(@class,'MuiGrid2-root')]/div/div/div/input)[2]");
    this.mobileInput = page.locator("(//div[contains(@class,'MuiGrid2-root')]/div/div/div/input)[3]");
    this.designationInput = page.locator("(//div[contains(@class,'MuiGrid2-root')]/div/div/div/input)[4]");
    this.departmentInput = page.locator("(//div[contains(@class,'MuiGrid2-root')]/div/div/div/input)[5]");
    this.accessInput = page.locator("//div[contains(@class,'MuiGrid2-root')]/div/div/div/div/div/input");
    this.saveButton = page.locator("((//form[contains(@class,'MuiBox-root')]/div)[2]/button)[2]");

    // First row columns
    this.firstRow = page.locator('(//tbody/tr[1])');
    this.firstRowName = page.locator('(//tbody/tr[1]/td)[1]');
    this.firstRowDepartment = page.locator('(//tbody/tr[1]/td)[2]');
    this.firstRowDesignation = page.locator('(//tbody/tr[1]/td)[3]');
    this.firstRowEmail = page.locator('(//tbody/tr[1]/td)[4]');
    this.firstRowMobile = page.locator('(//tbody/tr[1]/td)[5]');
    this.firstRowStatus = page.locator('(//tbody/tr[1]/td)[6]/div/span');
    this.firstRowAccess = page.locator('(//tbody/tr[1]/td)[7]');

    // View button for first row
    this.firstRowViewBtn = page.locator("(//tr[1]/td[contains(@class,'MuiTableCell-root')])[9]/button[2]");

    // View page inputs
    this.viewName = page.locator('(//input)[2]');
    this.viewEmail = page.locator('(//input)[3]');
    this.viewMobile = page.locator('(//input)[4]');
    this.viewDesignation = page.locator('(//input)[5]');
    this.viewDepartment = page.locator('(//input)[6]');
    this.viewAccess = page.locator('(//input)[7]');
    this.viewStatus = page.locator('(//input)[8]');
  }

  async goToUsers() {
    await this.settingsLink.click();
    await this.usersFirstLink.waitFor({ state: 'visible', timeout: 10000 });
    // optional: ensure the first link text contains USERS
    try {
      const text = (await this.usersFirstLink.innerText()).trim().toUpperCase();
      if (!text.includes('USER')) {
        // still proceed but log
        console.warn('UsersPage: first link text does not include "USER":', text);
      }
    } catch (e) {
      // ignore
    }
  }

  /**
   * Create a user using the provided object
   * { name, email, mobile, designation, department, access }
   */
  async createUser(user) {
    await this.addButton.click();
    await this.nameInput.fill(user.name);
    await this.emailInput.fill(user.email);
    await this.mobileInput.fill(user.mobile);
    await this.designationInput.fill(user.designation);
    await this.departmentInput.fill(user.department);

    // Access may be a dropdown - type and select
    await this.accessInput.click();
    await this.accessInput.fill(user.access);
    // Try to click a matching option if it appears
    const option = this.page.locator(`xpath=//li//*[normalize-space(text())='${user.access}'] | //div[normalize-space(text())='${user.access}'] | //label[normalize-space(.)='${user.access}']`);
    try {
      await option.first().waitFor({ state: 'visible', timeout: 3000 });
      await option.first().click();
    } catch (e) {
      // fallback to keyboard selection
      await this.accessInput.press('ArrowDown');
      await this.accessInput.press('Enter');
    }

    // Click save and wait for table to reload (first row visible)
    await this.saveButton.click();
    await this.firstRow.waitFor({ state: 'visible', timeout: 10000 });
  }

  async getFirstRowData() {
    // Read text from the first row columns
    const obj = {};
    obj.name = (await this.firstRowName.innerText()).trim();
    obj.department = (await this.firstRowDepartment.innerText()).trim();
    obj.designation = (await this.firstRowDesignation.innerText()).trim();
    obj.email = (await this.firstRowEmail.innerText()).trim();
    obj.mobile = (await this.firstRowMobile.innerText()).trim();
    obj.status = (await this.firstRowStatus.innerText()).trim();
    obj.access = (await this.firstRowAccess.innerText()).trim();
    return obj;
  }

  async openFirstRowView() {
    await this.firstRowViewBtn.click();
    // wait for view inputs
    await this.viewName.waitFor({ state: 'visible', timeout: 8000 });
  }

  async getViewData() {
    const obj = {};
    obj.name = (await this.viewName.inputValue()).trim();
    obj.email = (await this.viewEmail.inputValue()).trim();
    obj.mobile = (await this.viewMobile.inputValue()).trim();
    obj.designation = (await this.viewDesignation.inputValue()).trim();
    obj.department = (await this.viewDepartment.inputValue()).trim();
    obj.access = (await this.viewAccess.inputValue()).trim();
    obj.status = (await this.viewStatus.inputValue()).trim();
    return obj;
  }
}

module.exports = UsersPage;

