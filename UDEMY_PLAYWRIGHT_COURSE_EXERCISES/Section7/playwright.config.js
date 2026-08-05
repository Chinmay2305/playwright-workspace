// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

//Maximum time 1 test can run on
  timeout: 30*1000,
  expect: {
    timeout: 5000,
  },

  reporter: [['html', { open: 'always' }]],

  use: {
    browserName: "chromium",
    channel: "chrome",
    headless: true,
    screenshot: 'on',
    actionTimeout: 10*1000,

    viewport: {
      width: 1920,
      height: 1080
    },

    launchOptions: {
      slowMo: 1000,
      args: ['--window-size=1920,1080']
    },

    trace: 'on-first-retry',
  },
});