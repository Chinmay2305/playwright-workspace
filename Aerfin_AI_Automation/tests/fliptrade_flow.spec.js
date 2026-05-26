const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const FlipTradingPage = require('../pages/FlipTradingPage');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

test.describe('Flip Trading full flow: Filter -> Sort -> Export', () => {
  const validUsername = 'support@acumen.aero';
  const validPassword = 'Acumen@123';
  // exportPath will be computed per-test inside playwright-report with a timestamp

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Filtering + Sorting (all columns) + Exporting + Validation', async ({ page }) => {
    const login = new LoginPage(page);
    const flip = new FlipTradingPage(page);

    // login and navigate
    await login.login(validUsername, validPassword);
    await flip.flipTradingLink.waitFor({ state: 'visible', timeout: 15000 });
    await flip.goTo();

    // 1) Apply filter and validate (reuse the same logic as export.spec)
    await flip.applyStatusFilter('CANCELLED');

    await page.waitForSelector('//tbody/tr', { timeout: 15000 });
    const rowsLocator = page.locator('//tbody/tr');
    const rowCount = await rowsLocator.count();
    expect(rowCount).toBeGreaterThan(0);

    // Read table into webRows matrix (same as before)
    const webRows = [];
    for (let i = 0; i < rowCount; i++) {
      const rowLocator = rowsLocator.nth(i);
      const tds = rowLocator.locator('td');
      const tdCount = await tds.count();
      const row = [];
      for (let col = 1; col <= 9; col++) {
        if (col <= tdCount) {
          try {
            row.push((await tds.nth(col - 1).innerText()).trim());
          } catch (e) {
            const txt = await tds.nth(col - 1).textContent();
            row.push((txt || '').trim());
          }
        } else {
          row.push('');
        }
      }
      webRows.push(row);
    }

    // Validate filter applied:
    // - There should be at least one row with status containing 'cancelled'
    // - Every non-empty status cell should contain 'cancelled' (case-insensitive)
    const statusValues = webRows.map(r => (r[8] || '').trim());
    const nonEmpty = statusValues.filter(s => s !== '');
    expect(nonEmpty.length).toBeGreaterThan(0);
    for (const s of nonEmpty) {
      expect(s.toLowerCase()).toContain('cancelled');
    }

    // 2) Sorting: for each column index 1..9, click header, validate ascending & descending
    const columnTitles = [
      'Customer Reference No.',
      'Customer',
      'Total no. of parts',
      'Urgency',
      'Special requirement',
      'Remarks',
      'Created By',
      'Created Date',
      'Status'
    ];

    // Helper to find a clickable header for a given column index
    async function clickHeaderForColumn(page, colIndex) {
      const candidates = [
        `(//thead//th)[${colIndex}]`,
        `(//table//th)[${colIndex}]`,
        `(//div[contains(@class,'MuiTableCell-root') and contains(@class,'MuiTableCell-head')])[${colIndex}]`,
        `(//div[contains(@class,'MuiTableHead-root')]//div[contains(@class,'MuiTableCell-root')])[${colIndex}]`
      ];
      for (const xp of candidates) {
        const loc = page.locator(xp);
        try {
          if (await loc.count() && await loc.first().isVisible()) {
            await loc.first().click();
            return true;
          }
        } catch (e) {
          // continue
        }
      }
      // As a last resort, try clicking the header cell by position using the first row's corresponding cell's header via preceding::
      try {
        const headerViaCell = page.locator(`(//tbody/tr/td[${colIndex}])[1]/preceding::th[1]`);
        if (await headerViaCell.count()) {
          await headerViaCell.first().click();
          return true;
        }
      } catch (e) {}
      throw new Error('Header click failed for column ' + colIndex);
    }

    function normalizeForSort(colIndex, v) {
      if (!v) return '';
      // Created Date (colIndex 8) parse date like '12 Dec 2025'
      if (colIndex === 8) {
        const parts = v.trim().split(' ');
        if (parts.length >= 3) {
          const day = parseInt(parts[0], 10);
          const monthNames = { jan:0, feb:1, mar:2, apr:3, may:4, jun:5, jul:6, aug:7, sep:8, oct:9, nov:10, dec:11 };
          const mon = parts[1].slice(0,3).toLowerCase();
          const year = parseInt(parts[2], 10);
          if (!isNaN(day) && monthNames[mon] !== undefined && !isNaN(year)) {
            return new Date(year, monthNames[mon], day).getTime();
          }
        }
        // fallback to string
        return v.toLowerCase();
      }
      // Total parts (colIndex 3) numeric
      if (colIndex === 3) {
        const n = parseFloat(v.replace(/[^0-9.-]+/g, ''));
        return isNaN(n) ? v.toLowerCase() : n;
      }
      return v.toLowerCase();
    }

    // Helper to read column visible non-empty values and normalized forms
    const readColumnValues = async (col) => {
      const vals = [];
      const norms = [];
      for (let r = 0; r < rowCount; r++) {
        const row = rowsLocator.nth(r);
        const tds = row.locator('td');
        const tdCount = await tds.count();
        let txt = '';
        if (col <= tdCount) {
          try {
            txt = (await tds.nth(col - 1).innerText({ timeout: 1000 })) || '';
          } catch (e) {
            try {
              txt = (await tds.nth(col - 1).textContent()) || '';
            } catch (e2) {
              txt = '';
            }
          }
        } else {
          txt = '';
        }
        txt = txt.trim();
        if (txt !== '') {
          vals.push(txt);
          norms.push(normalizeForSort(col, txt));
        }
      }
      return { vals, norms };
    };

    for (let col = 1; col <= 9; col++) {
      console.log(`\nSorting validation for column ${col}: ${columnTitles[col - 1]}`);

      // Read original column values to compute canonical sorted orders
      const original = await readColumnValues(col);
      const normOriginal = original.norms;
      // canonical sorted arrays
      const sortedAscCanonical = [...normOriginal].slice().sort((a,b) => (a > b ? 1 : a < b ? -1 : 0));
      const sortedDescCanonical = [...sortedAscCanonical].slice().reverse();

      // Find ascending order by clicking header up to 3 times
      let ascFound = false;
      for (let attempt = 0; attempt < 3; attempt++) {
        await clickHeaderForColumn(page, col);
        await page.waitForTimeout(800);
        const cur = await readColumnValues(col);
        if (JSON.stringify(cur.norms) === JSON.stringify(sortedAscCanonical)) {
          ascFound = true;
          console.log('Asc order OK; Sample values:', cur.vals.slice(0,5));
          break;
        }
      }
      if (!ascFound) {
        // give a helpful log
        const cur = await readColumnValues(col);
        console.log('Asc order MISMATCH; observed sample:', cur.vals.slice(0,5));
      }

      // Find descending order by clicking header up to 3 times
      let descFound = false;
      for (let attempt = 0; attempt < 3; attempt++) {
        await clickHeaderForColumn(page, col);
        await page.waitForTimeout(800);
        const cur = await readColumnValues(col);
        if (JSON.stringify(cur.norms) === JSON.stringify(sortedDescCanonical)) {
          descFound = true;
          console.log('Desc order OK; Sample values:', cur.vals.slice(0,5));
          break;
        }
      }
      if (!descFound) {
        const cur = await readColumnValues(col);
        console.log('Desc order MISMATCH; observed sample:', cur.vals.slice(0,5));
      }

      expect(ascFound).toBeTruthy();
      expect(descFound).toBeTruthy();
    }

    // 3) Exporting + Validation
    // Re-read the current table state (after sorting) to compare with exported XLS
    await page.waitForSelector('//tbody/tr', { timeout: 15000 });
    const postRowsLocator = page.locator('//tbody/tr');
    const postRowCount = await postRowsLocator.count();
    const exportWebRows = [];
    for (let i = 0; i < postRowCount; i++) {
      const rowLocator = postRowsLocator.nth(i);
      const tds = rowLocator.locator('td');
      const tdCount = await tds.count();
      const row = [];
      for (let col = 1; col <= 9; col++) {
        if (col <= tdCount) {
          try {
            row.push((await tds.nth(col - 1).innerText()).trim());
          } catch (e) {
            const txt = await tds.nth(col - 1).textContent();
            row.push((txt || '').trim());
          }
        } else {
          row.push('');
        }
      }
      exportWebRows.push(row);
    }

    // compute timestamped path in playwright-report and export
    const reportDir = path.resolve(__dirname, '..', 'playwright-report');
    if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
    const now = new Date(); const pad = (n) => String(n).padStart(2,'0');
    const ts = `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    const exportPathTimed = path.join(reportDir, `Fliptrade_${ts}.xlsx`);
    console.log('Export will be saved to:', exportPathTimed);

    try { if (fs.existsSync(exportPathTimed)) fs.unlinkSync(exportPathTimed); } catch (e) {}
    await flip.exportToFile(exportPathTimed);
    // wait for file
    let attempts = 0;
    while (!fs.existsSync(exportPathTimed) && attempts < 20) { await new Promise(r => setTimeout(r, 500)); attempts++; }
    expect(fs.existsSync(exportPathTimed)).toBeTruthy();

    const workbook = xlsx.readFile(exportPathTimed);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    expect(sheet).toBeTruthy();

    // Helper to get raw cell
    function rawCell(col, row) { const addr = `${col}${row}`; return sheet[addr] || null; }
    const xlsColumns = ['A','B','H','C','E','I','F','G','D'];
    const normalize = (s) => String(s || '').replace(/\s+/g,' ').trim().toLowerCase();

    let totalMismatches = 0;
    for (let i = 0; i < exportWebRows.length; i++) {
      const xlsRowIndex = 3 + i;
      for (let colIndex = 0; colIndex < 9; colIndex++) {
        const webValue = (exportWebRows[i][colIndex] || '').trim();
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
        if (normalize(webValue) !== normalize(xlsValue)) {
          totalMismatches++;
          console.log(`Mismatch at row ${i+1} col ${colIndex+1}: Web='${webValue}' XLS='${xlsValue}'`);
        }
      }
    }
    console.log('Total mismatches in export validation:', totalMismatches);
    expect(totalMismatches).toBe(0);
  });
});

