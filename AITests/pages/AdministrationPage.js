const { expect } = require('@playwright/test');

class AdministrationPage {

    constructor(page)
    {

        this.page = page;

        // Dashboard Cards
        this.dashboardCards = page.locator('button[data-title] b');

        //Role title
        this.role = page.locator('i.role_margin');

        //Connector locators
        this.cardConnector = page.getByRole('button', { name: 'Access Connector' });
        this.organizationCount =page.locator('a[href="/manage/organization/list"]:visible');
        this.organizationPagerInfo = page.locator('kendo-datapager-info.k-pager-info');

        //Toggle and Pagination locators
        this.organizationCards = page.locator('div.institute_block');
        this.nextPage = page.locator('button[aria-label="Go to the next page"]');
    }

    // Successful login verification with Cards
    async verifyDashboard(expectedRole, expectedCards)
    {
        // Verify role
        await expect(this.role).toBeVisible({ timeout: 10000 });
        const actualRole = (await this.role.textContent()).replace("Current Role:", "").trim();
        console.log("Expected Role :", expectedRole);
        console.log("Actual Role   :", actualRole);
        expect(actualRole).toBe(expectedRole);
       
        // Verify cards
        await expect(this.dashboardCards.first()).toBeVisible({ timeout: 10000 });
        const actualCards = (await this.dashboardCards.allTextContents()).map(card => card.trim());
        console.log("Expected Cards :", expectedCards);
        console.log("Actual Cards   :", actualCards);
        expect(actualCards).toEqual(expectedCards);
    }

    async verifyOrganizationCount()
    {
        // Open Connector
        await this.cardConnector.click();
        
        // Wait for the dashboard count to be rendered; do not use a fixed delay.
        const organizationLink = this.organizationCount.first();
        await expect(organizationLink).toBeVisible({ timeout: 10000 });
        await expect(organizationLink).toHaveText(/\d+\s+Organizations/, { timeout: 10000 });

        const dashboardText = await organizationLink.textContent();
        const match = dashboardText.match(/\d+/);
        expect(match).not.toBeNull();
        const dashboardCount = Number(match[0]);
        console.log("Dashboard Count:", dashboardCount);
    
        // Open Organization list
        await organizationLink.click();

        // Wait for Organization page
        await expect(this.organizationPagerInfo).toBeVisible({ timeout: 10000 });

        const pagerText = await this.organizationPagerInfo.textContent();
        const totalOrganizations = pagerText.match(/of (\d+) Organizations/)[1];
        console.log("Total Organizations in pagination:", totalOrganizations);
        expect(Number(totalOrganizations)).toBe(dashboardCount + 1);
        
        await this.verifyOrganizationStatus(dashboardCount);
    }

    async verifyOrganizationStatus(dashboardCount)
    {
        let activeCount = 0;
        let inactiveCount = 0;
        
        while (true)
        {
            // Wait for cards to appear
            await expect(this.organizationCards.first()).toBeVisible();

            const cardCount = await this.organizationCards.count();
            console.log(`Cards on current page: ${cardCount}`);

            for (let i = 0; i < cardCount; i++)
            {
                const card = this.organizationCards.nth(i);
                const orgName = (await card.locator("h5").innerText()).trim();
                const toggle = card.locator("kendo-switch");
                console.log(await toggle.innerHTML());
                
                // Read the aria-checked attribute
                const state = await toggle.getAttribute("aria-checked");
                
                if (state === "1")
                {
                    console.log(`${orgName} -> YES`);
                    activeCount++;
                }
                else if (state === "false")
                {
                    console.log(`${orgName} -> NO`);
                    inactiveCount++;
                }
                else
                {
                    console.log(`${orgName} -> Unknown State: ${state}`);
                }
            }

            console.log("--------------------------------");
console.log("Next disabled:", await this.nextPage.isDisabled());
console.log("aria-disabled:", await this.nextPage.getAttribute("aria-disabled"));
console.log("class:", await this.nextPage.getAttribute("class"));

            // Last page?
            if (await this.nextPage.isDisabled())
                break;

            const firstOrg = (await this.organizationCards.first().locator("h5").innerText()).trim();

await this.nextPage.click();

// Wait until the first organization changes
await expect
    .poll(async () => {
        return (
            await this.organizationCards.first().locator("h5").innerText()
        ).trim();
    }, {
        timeout: 15000
    })
    .not.toBe(firstOrg);
        }

       console.log("--------------------------");
       console.log("Dashboard Active :", dashboardCount);
       console.log("Actual Active    :", activeCount);
       console.log("Actual Inactive  :", inactiveCount);
       console.log("--------------------------");
       
       expect(activeCount).toBe(dashboardCount);
       expect(inactiveCount).toBe(1);
    }
}

module.exports = AdministrationPage;
