module.exports = {
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  workers: 1,
  reporter: 'html',
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: false,
        reporter: [
          ['html', { open: 'always' }]
        ]
      },
    },
  ]
};
