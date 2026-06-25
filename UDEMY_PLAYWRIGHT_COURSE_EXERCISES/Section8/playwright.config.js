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
  channel: "chrome",
  headless: false,

  screenshot: 'on',
  trace: 'retain-on-failure', //- this will give tracing only for failing tests 
  //trace: 'on', //this will give tracing for all tests, regardless of failures or passing

  viewport: {
    width: 1920,
    height: 1080
  },

  launchOptions: {
    slowMo: 1000,
    args: ['--window-size=1920,1080']
  }
},
});