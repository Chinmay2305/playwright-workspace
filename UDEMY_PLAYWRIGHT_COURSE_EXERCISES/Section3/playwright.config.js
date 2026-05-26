// @ts-check
import { defineConfig } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30000,  //max time one test can run for
    expect :{
      timeout: 5000,
    },
    reporter: [
      ['html',{open:'always'}]
    ],
  use: {
    browserName: "firefox", //options are webkit (safari), chromium (chrome), firefox
//    channel: "chrome",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    headless: true,
    trace: 'on-first-retry',
  },
});

//module.exports = config