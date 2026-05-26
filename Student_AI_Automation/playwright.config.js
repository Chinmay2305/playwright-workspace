// @ts-check
// Playwright Test configuration

/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
  testDir: 'tests',

  // Global timeout for each test
  timeout: 30 * 1000,

  // Expect timeout
  expect: {
    timeout: 5000
  },

  // Run tests serially (you can change later)
  fullyParallel: false,

  // Reporters
  reporter: [
    ['list'],
    ['html', {
      outputFolder: 'playwright-report',
      open: 'always'   // change to 'always' if you want every time
    }]
  ],

  // Shared settings for all tests
  use: {
    baseURL: 'https://student-devcode.vercel.app/',

    headless: false,

    // Slow down Playwright operations so you can observe actions (milliseconds)
    launchOptions: {
      slowMo: 200
    },

    viewport: { width: 1280, height: 720 },

    actionTimeout: 5000,

    ignoreHTTPSErrors: true,

    // 📸 Screenshot on failure
    screenshot: 'only-on-failure',

    // 🎥 Record video on failure
    video: 'retain-on-failure',

    // 🔍 Trace for debugging (VERY powerful)
    trace: 'on-first-retry'
  },

  // Optional: Retry failed tests once
  retries: 1
};