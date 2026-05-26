const fs = require('fs');

class FlipTradingPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Navigation link to Flip Trading
    this.flipTradingLink = page.locator("//ul[contains(@class,'MuiList-root')]/a[5]");
    // Table body and status column cells
    this.tableBody = page.locator('//tbody');
    this.statusCells = page.locator("//tbody/tr/td[9]");

    // Filter controls
    this.filterButton = page.locator('(//button)[3]');
    this.statusInput = page.locator("(//input[contains(@class,'MuiInputBase-input')])[3]");
    this.applyButton = page.locator("(//div[contains(@class,'MuiPaper-root')]/div/div)[3]/button[1]");
    // Export button - (//button)[4]
    this.exportButton = page.locator('(//button)[4]');
  }

  async goTo() {
    await this.flipTradingLink.click();
    await this.page.waitForSelector('//tbody', { timeout: 15000 });
  }

  /**
   * Apply status filter. This method is resilient: it attempts a few selector
   * strategies and falls back to keyboard navigation if necessary.
   * @param {string} status
   */
  async applyStatusFilter(status) {
    await this.filterButton.click();
    await this.statusInput.fill(status);
    await this.page.waitForTimeout(500);

    const optionLocator = this.page.locator(
      `xpath=//li//*[normalize-space(text())='${status}'] | //label[normalize-space(.)='${status}'] | //div[normalize-space(text())='${status}'] | text=${status}`
    );
    try {
      await optionLocator.first().waitFor({ state: 'visible', timeout: 5000 });
      await optionLocator.first().click();
    } catch (e) {
      // fallback: use keyboard to select suggestion
      await this.statusInput.press('ArrowDown');
      await this.statusInput.press('Enter');
    }

    await this.applyButton.click();
    // Wait for results to render
    await this.page.waitForSelector('//tbody/tr/td[9]', { timeout: 15000 });
  }

  /**
   * Click export and save the downloaded file to targetPath.
   * @param {string} targetPath
   */
  async exportToFile(targetPath) {
    // Try Playwright download event first (most common)
    try {
      const [download] = await Promise.all([
        this.page.waitForEvent('download', { timeout: 7000 }),
        this.exportButton.click()
      ]);
      await download.saveAs(targetPath);
      return targetPath;
    } catch (err) {
      // Fallback: some apps return the file as a network response (no browser download event).
      // Attempt to click and capture a response with xlsx content-type or content-disposition.
      try {
        const responsePredicate = (response) => {
          try {
            const headers = response.headers();
            const ct = (headers['content-type'] || '') .toLowerCase();
            const cd = (headers['content-disposition'] || '').toLowerCase();
            if (ct.includes('spreadsheet') || ct.includes('application/octet-stream')) return true;
            if (cd.includes('.xlsx') || cd.includes('attachment')) return true;
            return false;
          } catch (e) {
            return false;
          }
        };

        const [response] = await Promise.all([
          this.page.waitForResponse(responsePredicate, { timeout: 10000 }),
          this.exportButton.click()
        ]);

        const buffer = await response.body();
        fs.writeFileSync(targetPath, buffer);
        return targetPath;
      } catch (err2) {
        // As a last resort, try to detect a popup/window with a download
        try {
          const [popup] = await Promise.all([
            this.page.waitForEvent('popup', { timeout: 5000 }),
            this.exportButton.click()
          ]);
          // Attempt to find an <a> with .xlsx href
          const link = await popup.locator('a[href$=".xlsx"]').first().getAttribute('href');
          if (link) {
            // try to fetch via page
            const resp = await this.page.request.get(link);
            const buf = await resp.body();
            fs.writeFileSync(targetPath, buf);
            return targetPath;
          }
        } catch (err3) {
          // ignore and throw combined error below
        }

        throw new Error(`Export failed: no download event or response detected. Errors: ${err.message}; ${err2 && err2.message}`);
      }
    }
  }

  /**
   * Return the status cells locator so tests can assert on values.
   */
  getStatusCells() {
    return this.statusCells;
  }
}

module.exports = FlipTradingPage;

