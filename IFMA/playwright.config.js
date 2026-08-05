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