const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test.describe('Analytics pie chart vs Projects table validation', () => {
  const validUsername = 'support@acumen.aero';
  const validPassword = 'Acumen@123';

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Project status by product - hover pie parts and compare with Projects table filters', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(validUsername, validPassword);

    // Navigate to the analytics graph by clicking the Analytics link and selecting the graph
    // Click Analytics in the sidebar (6th anchor under MuiList-root)
    try {
      const analyticsLink = page.locator("xpath=(//ul[contains(@class,'MuiList-root')]/a)[6]");
      await analyticsLink.first().waitFor({ state: 'visible', timeout: 5000 });
      await analyticsLink.first().click();
      await page.waitForLoadState('networkidle');
      // Click the 'Project status by product' item (5th li in the second list)
      const projectStatusItem = page.locator("xpath=((//ul[contains(@class,'MuiList-root')])[2]/li)[5]");
      await projectStatusItem.first().waitFor({ state: 'visible', timeout: 5000 });
      await projectStatusItem.first().click();
      await page.waitForLoadState('networkidle');
    } catch (e) {
      // Fallback: navigate directly if clicks fail
      await page.goto('/analytics?graph=Project+status+by+product');
      await page.waitForLoadState('networkidle');
    }

    // Wait for chart SVG or canvas to ensure the analytics graph rendered
    await page.locator('svg, canvas').first().waitFor({ state: 'visible', timeout: 10000 });

    // Tooltip locator candidates (floating divs or role=tooltip)
    const tooltipCandidates = [
      // a generic floating tooltip with translate3d transform
      page.locator("xpath=//div[contains(@style,'translate3d') and contains(., 'Projects') ]"),
      // role based
      page.locator('[role="tooltip"]'),
      // any tooltip-like div
      page.locator("xpath=//div[contains(@class,'tooltip') and contains(., 'Projects')]")
    ];

    // include the border-color RGB hints for more reliable tooltip detection
    const parts = [
      { name: 'Closed', coords: { x: 425, y: 234 }, colorRgb: 'rgb(156, 23, 119)' },
      { name: 'Awarded', coords: { x: 559, y: 233 }, colorRgb: 'rgb(10, 182, 207)' },
      { name: 'Ongoing', coords: { x: 480, y: 260 }, colorRgb: 'rgb(227, 73, 41)' }
    ];

    // For comparing numbers (remove non-digits)
    function extractNumber(text) {
      if (!text) return null;
      const m = text.match(/#\s*([0-9,]+)/) || text.match(/:\s*#\s*([0-9,]+)/) || text.match(/([0-9,]+)\s*\(/);
      if (m && m[1]) return parseInt(m[1].replace(/,/g, ''), 10);
      const m2 = text.match(/([0-9,]+)/);
      return m2 ? parseInt(m2[1].replace(/,/g, ''), 10) : null;
    }

    // For each part, hover and read tooltip
    // Compute coordinates relative to the chart SVG bounding box to avoid hitting sidebar/menu
    const svg = page.locator('svg, canvas').first();
    let bbox = null;
    try {
      bbox = await svg.boundingBox();
    } catch (e) {
      // ignore
    }
    // Try multiple strategies to reveal tooltip for each part: legend hover, SVG slice hover, canvas sampling
    for (const part of parts) {
      console.log('\nProcessing part:', part.name);
      let tooltipText = '';
      let foundTooltip = false;

      console.log('SVG/Canvas bbox:', bbox);

      // Strategy 1: hover legend or label text matching the part name
      try {
        const legend = page.locator(`xpath=//*[normalize-space(text())='${part.name}' or contains(normalize-space(.), '${part.name}')]`);
        if (await legend.count()) {
          const v = legend.first();
          if (await v.isVisible()) {
            await v.hover();
            await page.waitForTimeout(300);
            for (const cand of tooltipCandidates) {
              try {
                if (await cand.count() && await cand.first().isVisible()) {
                  tooltipText = (await cand.first().innerText()).trim();
                  if (tooltipText.toLowerCase().includes(part.name.toLowerCase())) { foundTooltip = true; break; }
                }
              } catch (e) {}
            }
          }
        }
      } catch (e) {}

      // Strategy 2: if chart is SVG, try hovering SVG slice elements
      if (!foundTooltip) {
        const sliceSelectors = ['svg path', 'svg g path', 'svg circle', 'svg rect'];
        for (const sel of sliceSelectors) {
          const elems = page.locator(sel);
          const count = await elems.count();
          for (let i = 0; i < count; i++) {
            try {
              const el = elems.nth(i);
              const bb = await el.boundingBox();
              if (!bb) continue;
              const hx = Math.round(bb.x + bb.width / 2);
              const hy = Math.round(bb.y + bb.height / 2);
              await page.mouse.move(hx, hy);
              await page.waitForTimeout(300);
              for (const cand of tooltipCandidates) {
                try {
                  if (await cand.count() && await cand.first().isVisible()) {
                    tooltipText = (await cand.first().innerText()).trim();
                    if (tooltipText.toLowerCase().includes(part.name.toLowerCase())) { foundTooltip = true; break; }
                  }
                } catch (e) {}
              }
            } catch (e) {}
            if (foundTooltip) break;
          }
          if (foundTooltip) break;
        }
      }

      // Strategy 3: if a canvas exists, sample multiple points within canvas bbox
      if (!foundTooltip && bbox) {
        try {
          const canv = page.locator('canvas').first();
          if (await canv.count()) {
            // sample a grid of points inside bbox
            const steps = 5;
            for (let xi = 1; xi <= steps && !foundTooltip; xi++) {
              for (let yi = 1; yi <= steps && !foundTooltip; yi++) {
                const hx = Math.round(bbox.x + (xi / (steps + 1)) * bbox.width);
                const hy = Math.round(bbox.y + (yi / (steps + 1)) * bbox.height);
                await page.mouse.move(hx, hy);
                await page.waitForTimeout(200);
                for (const cand of tooltipCandidates) {
                  try {
                    if (await cand.count() && await cand.first().isVisible()) {
                      tooltipText = (await cand.first().innerText()).trim();
                      if (tooltipText.toLowerCase().includes(part.name.toLowerCase())) { foundTooltip = true; break; }
                    }
                  } catch (e) {}
                }
              }
            }
          }
        } catch (e) {}
      }

      if (!foundTooltip) {
        console.log(`Failed to find tooltip for ${part.name}. Last tooltip text:`, tooltipText);
        throw new Error('Tooltip not found after hovering for ' + part.name);
      }
      console.log('Tooltip text for', part.name, ':', tooltipText.replace(/\n/g, ' | '));
      const tooltipNumber = extractNumber(tooltipText);
      if (tooltipNumber === null) throw new Error('Could not parse number from tooltip: ' + tooltipText);

      // Now go to Projects page and apply filter for this status. Use navigation to /projects
      await page.goto('/projects');
      await page.waitForLoadState('networkidle');

      // Open filter panel - try multiple candidate selectors
      const filterCandidates = [
        "xpath=((//div[contains(@class,'MuiBox-root')])[5]/div)[2]/button[1]",
        "xpath=(//button[contains(., 'Filter')])[1]",
        "xpath=//button[@aria-label='Filter']"
      ];
      let filterClicked = false;
      for (const sel of filterCandidates) {
        const loc = page.locator(sel);
        try { if (await loc.count() && await loc.first().isVisible()) { await loc.first().click(); filterClicked = true; break; } } catch (e) {}
      }
      if (!filterClicked) throw new Error('Could not open filter panel');

      // Fill Bid Status filter (second autocomplete input) - try candidate selectors
      const bidCandidates = [
        "xpath=(//div[contains(@class,'MuiAutocomplete-root')]/div/div/input)[2]",
        "xpath=(//input[@aria-label='Bid Status'])[1]",
        "xpath=//input[contains(@placeholder,'Bid Status')]"
      ];
      let inputFilled = false;
      for (const sel of bidCandidates) {
        try {
          const loc = page.locator(sel);
          if (await loc.count() && await loc.first().isVisible()) {
            await loc.first().fill(part.name);
            await page.waitForTimeout(400);
            // try selecting option
            const option = page.locator(`xpath=//li//*[normalize-space(text())='${part.name}'] | //div[normalize-space(text())='${part.name}'] | //label[normalize-space(.)='${part.name}']`);
            try { await option.first().waitFor({ state: 'visible', timeout: 2000 }); await option.first().click(); } catch (e) {}
            inputFilled = true; break;
          }
        } catch (e) {}
      }
      if (!inputFilled) console.log('Warning: could not fill Bid Status input, proceeding to apply');

      // Click apply filter button - candidates
      const applyCandidates = [
        "xpath=((//div[contains(@class,'MuiPaper-root')]/div[contains(@class,'MuiBox-root')]/div[contains(@class,'MuiBox-root')])[3]/button)[1]",
        "xpath=//button[contains(., 'Apply')][1]",
        "xpath=//button[contains(., 'Filter') and not(contains(., 'Reset'))][1]"
      ];
      let applied = false;
      for (const sel of applyCandidates) {
        try { const loc = page.locator(sel); if (await loc.count() && await loc.first().isVisible()) { await loc.first().click(); applied = true; break; } } catch (e) {}
      }
      if (!applied) throw new Error('Could not click apply filter button');

      // Wait for footer count - try multiple selectors
      const footerCandidates = [
        "xpath=(//div[contains(@class,'MuiBox-root')]/div[contains(@class,'MuiBox-root')]/div[contains(@class,'MuiBox-root')]/div[contains(@class,'MuiBox-root')])[4]/span",
        "xpath=//div[contains(@class,'MuiTableFooter') or contains(@class,'footer')]//span",
        "xpath=//span[contains(., 'rows') or contains(., 'records') or contains(., 'Total')]"];
      let footerText = '';
      for (const sel of footerCandidates) {
        try {
          const loc = page.locator(sel);
          if (await loc.count()) {
            await loc.first().waitFor({ state: 'visible', timeout: 3000 });
            footerText = (await loc.first().innerText()).trim();
            break;
          }
        } catch (e) {}
      }
      if (!footerText) throw new Error('Footer count not found after applying filter for ' + part.name);
      console.log('Footer text for', part.name, ':', footerText);
      const footerNumber = extractNumber(footerText);
      if (footerNumber === null) throw new Error('Could not parse number from footer: ' + footerText);

      const match = tooltipNumber === footerNumber;
      console.log(`Comparison for ${part.name}: Tooltip=${tooltipNumber} | Table=${footerNumber} => ${match ? 'RIGHT' : 'WRONG'}`);
      expect(match).toBeTruthy();
    }
  });
});

