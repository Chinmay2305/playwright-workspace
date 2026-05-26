const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');

test.describe.serial('Dashboard tests - ordered (login, add, search, filter)', () => {
  let page;
  let loginPage;
  let dashboardPage;

  test.beforeAll(async ({ browser }) => {
    // Create a single page that will be reused across the serial tests
    const context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    // Navigate to base and perform login once
    await page.goto('/');
    await loginPage.login('admin', '123');
    // Ensure we are on dashboard by checking title and key elements
    await expect(page.locator('xpath=//h2')).toHaveText('Student Dashboard', { timeout: 5000 });
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('1) Login + Dashboard validation', async () => {
    // Verify UI titles on dashboard
    await dashboardPage.verifyDashboardTitles();
  });

  test('2) Add student + verify table', async () => {
    // Add multiple students as per requested data sets
    const students = [
      { name: 'Chinmay Agrawal', percentage: 70 },
      { name: 'Sarju Parekh', percentage: 95 },
      { name: 'Divyaraj', percentage: 52 },
    ];

    for (const s of students) {
      await dashboardPage.addStudent(s.name, s.percentage);
      // Locate the row we just added by matching the name in the table
      const nameCell = page.locator(`xpath=//table/tbody/tr/td[text()="${s.name}"]`).first();
      await expect(nameCell).toBeVisible({ timeout: 3000 });
      const percentCell = page.locator(`xpath=//table/tbody/tr[td[1][text()="${s.name}"]]/td[2]`).first();
      const resultCell = page.locator(`xpath=//table/tbody/tr[td[1][text()="${s.name}"]]/td[3]`).first();
      await expect(percentCell).toContainText(String(s.percentage));
      const expectedResult = s.percentage >= 80 ? 'PASS' : 'FAIL';
      await expect(resultCell).toHaveText(expectedResult);
    }
  });

  test('3) Search student', async () => {
    const studentName = 'Chinmay';
    // Use the search input to type partial name and validate dynamic filtering
    const found = await dashboardPage.searchStudent(studentName);
    expect(found).toBeTruthy();
    // Locate the specific row for Chinmay and verify percentage/result
    const nameCell = page.locator(`xpath=//table/tbody/tr/td[1][contains(text(),"${studentName}")]`).first();
    await expect(nameCell).toBeVisible();
    const row = nameCell.locator('xpath=ancestor::tr');
    const percentText = await row.locator('xpath=./td[2]').first().innerText();
    const resultText = await row.locator('xpath=./td[3]').first().innerText();
    expect(Number(percentText.trim())).toBe(70);
    expect(resultText.trim()).toBe('FAIL');
  });

  test('4) Filter by result - FAIL then PASS', async () => {
    // First filter by FAIL
    const failResults = await dashboardPage.filterByResult('FAIL');
    if (failResults.length === 0) {
      // No FAIL rows - log and continue
      test.info().annotations.push({ type: 'warning', description: 'No FAIL rows present' });
    } else {
      for (const r of failResults) expect(r.toUpperCase()).toBe('FAIL');
    }

    // Then filter by PASS
    const passResults = await dashboardPage.filterByResult('PASS');
    if (passResults.length === 0) {
      test.info().annotations.push({ type: 'warning', description: 'No PASS rows present' });
    } else {
      for (const r of passResults) expect(r.toUpperCase()).toBe('PASS');
    }
  });
});

