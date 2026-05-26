// @ts-check
const { defineConfig } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: 'tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 5000
  },
  retries: 0,
  // Force tests to run with a single worker to avoid parallel runs
  workers: 1,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'always' }]],
  use: {
    baseURL: 'https://qa.aerfinity.acumenaviation.in',
    headless: false,
    viewport: { width: 1280, height: 800 },
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    launchOptions: {
      slowMo: 120
    },
    trace: 'on-first-retry'
  }
});

