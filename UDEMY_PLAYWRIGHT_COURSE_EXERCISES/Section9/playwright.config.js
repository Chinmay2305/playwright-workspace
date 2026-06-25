// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  timeout: 30000,

  expect: {
    timeout: 5000,
  },

  reporter: [['html', { open: 'always' }]],

  use: {
    browserName: "chromium",
    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure',
    viewport: null,
    launchOptions: {
      slowMo: 1000,
      args: ['--start-maximized']
    }
  },
});