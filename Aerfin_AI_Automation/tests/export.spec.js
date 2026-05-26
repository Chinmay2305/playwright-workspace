const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const FlipTradingPage = require('../pages/FlipTradingPage');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

test.describe('Flip Trading export validation', () => {
  const validUsername = 'support@acumen.aero';
  const validPassword = 'Acumen@123';
  // exportPath will be computed per-test to include a timestamp and be saved under playwright-report
  // (computed inside the test so each run gets a unique filename)

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Export filtered data and validate XLS matches web table', async ({ page }) => {
    const login = new LoginPage(page);
    const flip = new FlipTradingPage(page);

    // login and navigate
    await login.login(validUsername, validPassword);
    // ensure menu finished loading by waiting for Flip Trading link
    await flip.flipTradingLink.waitFor({ state: 'visible', timeout: 15000 });
    await flip.goTo();

    // apply CANCELLED filter
    await flip.applyStatusFilter('CANCELLED');

    // collect web table rows - wait for at least one row
    await page.waitForSelector('//tbody/tr', { timeout: 15000 });
    const rowsLocator = page.locator('//tbody/tr');
    const rowCount = await rowsLocator.count();
    expect(rowCount).toBeGreaterThan(0);

    // For each row read the 9 columns as per mapping
    const webRows = [];
    for (let i = 0; i < rowCount; i++) {
      const rowLocator = rowsLocator.nth(i);
      const tds = rowLocator.locator('td');
      const tdCount = await tds.count();
      const row = [];
      for (let col = 1; col <= 9; col++) {
        if (col <= tdCount) {
          try {
            const text = await tds.nth(col - 1).innerText({ timeout: 1000 });
            row.push(text.trim());
          } catch (e) {
            // if innerText times out or not visible, fallback to textContent or empty
            try {
              const text = await tds.nth(col - 1).textContent({ timeout: 500 });
              row.push((text || '').trim());
            } catch (e2) {
              row.push('');
            }
          }
        } else {
          row.push('');
        }
      }
      webRows.push(row);
    }

    // compute timestamped export path inside playwright-report
    const reportDir = path.resolve(__dirname, '..', 'playwright-report');
    if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const ts = `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    const exportPathTimed = path.join(reportDir, `Fliptrade_${ts}.xlsx`);
    console.log('Export will be saved to:', exportPathTimed);

    // remove existing file if present (safety)
    try {
      if (fs.existsSync(exportPathTimed)) fs.unlinkSync(exportPathTimed);
    } catch (e) {
      // ignore
    }

    // export and wait for download, FlipTradingPage.exportToFile will save the file
    await flip.exportToFile(exportPathTimed);

    // wait for the file to appear on disk
    let attempts = 0;
    while (!fs.existsSync(exportPathTimed) && attempts < 20) {
      await new Promise((r) => setTimeout(r, 500));
      attempts++;
    }
    expect(fs.existsSync(exportPathTimed)).toBeTruthy();

    // read XLSX
    const workbook = xlsx.readFile(exportPathTimed);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Helper to get raw cell object by column (A..I) and row (number)
    function rawCell(col, row) {
      const address = `${col}${row}`;
      return sheet[address] || null;
    }

    // Mapping: WEB index -> XLS column
    const xlsColumns = ['A', 'B', 'H', 'C', 'E', 'I', 'F', 'G', 'D'];

    // Helper to normalize string values for comparison
    const normalize = (s) => String(s || '').replace(/\s+/g, ' ').trim().toLowerCase();

    // Data in XLS starts from row 3 (titles row 1)
    // Prepare per-column logging and comparison
    const columnTitles = [
      'Customer Reference No.',
      'Customer',
      'Total number of parts',
      'Urgency',
      'Special Requirement',
      'Remarks',
      'Created By',
      'Created Date',
      'Status'
    ];

    const perColumnResults = Array.from({ length: 9 }, () => []);
    let totalMismatches = 0;

    for (let i = 0; i < webRows.length; i++) {
      const xlsRowIndex = 3 + i;
      for (let colIndex = 0; colIndex < 9; colIndex++) {
        const webValue = (webRows[i][colIndex] || '').trim();

        const cellObj = rawCell(xlsColumns[colIndex], xlsRowIndex);
        let xlsValue = '';
        if (cellObj) {
          if (colIndex === 7 && (cellObj.t === 'n' || !isNaN(Number(cellObj.v)))) {
            const parsed = xlsx.SSF && xlsx.SSF.parse_date_code ? xlsx.SSF.parse_date_code(Number(cellObj.v)) : null;
            if (parsed && parsed.y) {
              const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
              const day = parsed.d;
              const month = monthNames[(parsed.m || 1) - 1];
              const year = parsed.y;
              xlsValue = `${day} ${month} ${year}`;
            } else {
              xlsValue = String(cellObj.v);
            }
          } else {
            xlsValue = String(cellObj.v).trim();
          }
        }

        const webNorm = normalize(webValue);
        const xlsNorm = normalize(xlsValue);
        const match = webNorm === xlsNorm;
        if (!match) totalMismatches++;
        perColumnResults[colIndex].push({ row: i + 1, webValue, xlsValue, match });
      }
    }

    // Print detailed logs per column
    console.log('\n=== Export Validation Detailed Log ===');
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      const results = perColumnResults[colIndex];
      console.log(`\nCOLUMN ${colIndex + 1}: ${columnTitles[colIndex]}`);
      let matches = 0;
      for (const r of results) {
        const status = r.match ? 'RIGHT' : 'WRONG';
        if (r.match) matches++;
        console.log(`Row ${r.row}: Web='${r.webValue}' | XLS='${r.xlsValue}' => ${status}`);
      }
      console.log(`Summary COLUMN ${colIndex + 1}: ${matches}/${results.length} matched`);
    }

    console.log(`\nTotal mismatches across all columns: ${totalMismatches}`);

    // Final assertion: no mismatches
    expect(totalMismatches).toBe(0);
  });
});
