import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120000,
  expect: {
    timeout: 5000,
  },
  retries: 1,
  reporter: [ ['html', { open: 'always' }], ['list'] ],
  use: {
    headless: false,
    actionTimeout: 120000,
    navigationTimeout: 120000,
    launchOptions: {
      slowMo: 1500,
    },
    screenshot: 'on',
    video: 'on',
    trace: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

