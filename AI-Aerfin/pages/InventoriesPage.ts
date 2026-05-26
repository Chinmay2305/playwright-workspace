import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { loadConfig, getLocator } from '../config/configReader';

export class InventoriesPage extends BasePage {
  private cfg = loadConfig();

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await this.goto(this.cfg.inventoriesUrl);
    // Wait for DOMContentLoaded explicitly in the test where used
  }

  tableSelector() {
    return getLocator('inventories.table') || 'table';
  }

  async waitForTable() {
    const sel = this.tableSelector();
    await this.waitForSelector(sel, 30000);
  }

  async getAllRows() {
    const sel = this.tableSelector();
    const rows = await this.page.locator(`${sel} tbody tr`).elementHandles();
    return rows;
  }

  async getColumnIndexByHeader(headerText: string) {
    const sel = this.tableSelector();
    const headers = this.page.locator(`${sel} thead tr th`);
    const count = await headers.count();
    for (let i = 0; i < count; i++) {
      const txt = (await headers.nth(i).innerText()).trim();
      if (txt.toLowerCase() === headerText.toLowerCase()) return i;
    }
    return -1;
  }

  async getCellTextByRowIndex(rowIndex: number, colIndex: number) {
    const sel = this.tableSelector();
    const cell = this.page.locator(`${sel} tbody tr`).nth(rowIndex).locator('td').nth(colIndex);
    return (await cell.innerText()).trim();
  }
}

