// DashboardPage - Page Object Model for dashboard interactions
class DashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Titles
    this.dashboardTitle = page.locator('xpath=//h2');
    this.addStudentTitle = page.locator('xpath=//h3[1]');
    this.searchTitle = page.locator('xpath=//h3[2]');
    this.filterTitle = page.locator('xpath=//h3[3]');
    this.tableTitle = page.locator('xpath=//h3[4]');

    // Add student inputs and button (on the dashboard)
    this.addNameInput = page.locator('xpath=//input[1]');
    this.addPercentInput = page.locator('xpath=//input[2]');
    this.addButton = page.locator('xpath=//button');

    // Table row cells for second row (first data row)
    this.tableRowName = page.locator('xpath=//table/tbody/tr[2]/td[1]');
    this.tableRowPercentage = page.locator('xpath=//table/tbody/tr[2]/td[2]');
    this.tableRowResult = page.locator('xpath=//table/tbody/tr[2]/td[3]');

    // Search and filter controls
    this.searchInput = page.locator('xpath=//input[contains(@id,\'search\')]');
    this.filterSelect = page.locator('xpath=//select');

    // Generic table rows locator (data rows)
    this.tableDataRows = page.locator('xpath=//table/tbody/tr');
  }

  async verifyDashboardTitles() {
    // Use UI assertions to verify titles
    await this.dashboardTitle.waitFor({ state: 'visible' });
    await expect(this.dashboardTitle).toHaveText('Student Dashboard');
    await expect(this.addStudentTitle).toHaveText('Add Student');
    await expect(this.searchTitle).toHaveText('Search by name');
    await expect(this.filterTitle).toHaveText('Filter by Result');
    await expect(this.tableTitle).toHaveText('Student Table');
  }

  async addStudent(name, percentage) {
    await this.addNameInput.fill(name);
    await this.addPercentInput.fill(String(percentage));
    await this.addButton.click();
    // Wait for the student to appear in the table (search by cell text)
    const studentNameCell = this.page.locator(`xpath=//table/tbody/tr/td[text()="${name}"]`);
    await studentNameCell.first().waitFor({ state: 'visible', timeout: 5000 });
  }

  async getStudentFromTable(rowIndex = 2) {
    const nameLocator = this.page.locator(`xpath=//table/tbody/tr[${rowIndex}]/td[1]`);
    const percentLocator = this.page.locator(`xpath=//table/tbody/tr[${rowIndex}]/td[2]`);
    const resultLocator = this.page.locator(`xpath=//table/tbody/tr[${rowIndex}]/td[3]`);
    const exists = await nameLocator.count();
    if (!exists) return null;
    const name = (await nameLocator.first().innerText()).trim();
    const percentageText = (await percentLocator.first().innerText()).trim();
    const result = (await resultLocator.first().innerText()).trim();
    // Try to parse percentage as number
    const percentage = Number(percentageText);
    return { name, percentage, result };
  }

  async searchStudent(name) {
    await this.searchInput.fill(name);
    // Wait for table to reflect search results: either a matching cell appears or rows reduce
    const matchingCell = this.page.locator(`xpath=//table/tbody/tr/td[text()="${name}"]`);
    // Wait up to a short timeout for UI to update
    await matchingCell.first().waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
    // Return whether any visible row has the name
    const count = await matchingCell.count();
    return count > 0;
  }

  async filterByResult(value) {
    // value expected 'PASS' or 'FAIL'
    // Try selecting by label; if option values are lower/upper case, Playwright will handle label match
    await this.filterSelect.selectOption({ label: value }).catch(async () => {
      // Fallback: try selecting by value (lowercase)
      await this.filterSelect.selectOption(value.toLowerCase()).catch(() => {});
    });
    // Wait for table to update - small timeout; then collect visible result texts
    await this.page.waitForTimeout(500);
    const resultCells = this.page.locator('xpath=//table/tbody/tr/td[3]');
    const texts = [];
    const count = await resultCells.count();
    for (let i = 0; i < count; i++) {
      const txt = (await resultCells.nth(i).innerText()).trim();
      texts.push(txt);
    }
    return texts;
  }

  async getResultColumnValue(rowIndex = 2) {
    const locator = this.page.locator(`xpath=//table/tbody/tr[${rowIndex}]/td[3]`);
    const count = await locator.count();
    if (!count) return null;
    return (await locator.first().innerText()).trim();
  }
}

// Note: expect is used inside methods; import locally to avoid global dependency in tests
const { expect } = require('@playwright/test');

module.exports = DashboardPage;

