// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({

  testDir: './tests',
  timeout:30000,
  expect: { timeout: 5000, },
  reporter: [['html', { open: 'always' }]],

  use: {

    browserName: 'chromium',

    headless: false,

    viewport: { width: 1920, height: 1080 },

    launchOptions: {
      slowMo: 1000
    }

  }

});