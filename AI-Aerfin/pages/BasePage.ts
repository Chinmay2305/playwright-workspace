import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  locator(selector: string): Locator {
    if (selector.startsWith('//') || selector.startsWith('(')) {
      return this.page.locator(selector);
    }
    return this.page.locator(selector);
  }

  async click(selector: string, options = {}) {
    const el = this.locator(selector);
    await el.waitFor({ state: 'visible', timeout: 10000 });
    await el.click(options as any);
  }

  async fill(selector: string, value: string) {
    const el = this.locator(selector);
    await el.waitFor({ state: 'visible', timeout: 10000 });
    await el.fill(value);
  }

  async text(selector: string) {
    const el = this.locator(selector);
    await el.waitFor({ state: 'visible', timeout: 10000 });
    return await el.innerText();
  }

  async waitForSelector(selector: string, timeout = 15000) {
    return await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  async expectVisible(selector: string, timeout = 10000) {
    const el = this.locator(selector);
    await expect(el).toBeVisible({ timeout });
  }
}

