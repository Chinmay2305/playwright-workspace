import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { loadConfig, getLocator } from '../config/configReader';

export class LoginPage extends BasePage {
  private cfg = loadConfig();

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await this.goto(this.cfg.loginUrl);
  }

  async login(email?: string, password?: string) {
    const em = email ?? this.cfg.email;
    const pw = password ?? this.cfg.password;
    const emailSel = getLocator('login.email');
    const passSel = getLocator('login.password');
    const submitSel = getLocator('login.submit');

    if (!emailSel || !passSel || !submitSel) {
      throw new Error('Login locators not found in configuration');
    }

    await this.fill(emailSel, em);
    await this.fill(passSel, pw);
    await this.click(submitSel);
  }
}

