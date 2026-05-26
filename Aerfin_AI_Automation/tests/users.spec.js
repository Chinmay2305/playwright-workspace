const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const UsersPage = require('../pages/UsersPage');
const { createExportPath } = require('../scripts/export-helper');
const fs = require('fs');

test.describe('Users module - add and view user', () => {
  const validUsername = 'support@acumen.aero';
  const validPassword = 'Acumen@123';

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Add a user and verify in table and view', async ({ page }) => {
    const login = new LoginPage(page);
    const users = new UsersPage(page);

    await login.login(validUsername, validPassword);

    await users.goToUsers();

    const user = {
      name: 'Rahul',
      email: 'rahul@tests.com',
      mobile: '1918171615',
      designation: 'Testers',
      department: 'Software',
      access: 'Test'
    };

    await users.createUser(user);

    // verify in table first row
    const first = await users.getFirstRowData();
    expect(first.name).toBe(user.name);
    expect(first.department).toBe(user.department);
    expect(first.designation).toBe(user.designation);
    expect(first.email).toBe(user.email);
    expect(first.mobile).toBe(user.mobile);

    // view details
    await users.openFirstRowView();
    const view = await users.getViewData();
    expect(view.name).toBe(user.name);
    expect(view.email).toBe(user.email);
    expect(view.mobile).toBe(user.mobile);
    expect(view.designation).toBe(user.designation);
    expect(view.department).toBe(user.department);
    // access/status fields could vary; ensure access contains substring
    expect(view.access.toLowerCase()).toContain(user.access.toLowerCase());

    // Create an export path and log it (no export action in users yet, but keep for consistency)
    const exportPath = createExportPath('Users');
    // Ensure directory exists and log
    const dir = require('path').dirname(exportPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    console.log('Users test export path (not used for actual download here):', exportPath);
  });
});

