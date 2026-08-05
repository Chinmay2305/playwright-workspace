class commonfunctions {

    constructor(page) {
        this.page = page;
    }

    // Click
    async click(locator) {
        await locator.click();
    }

    // Type text
    async type(locator, text) {
        await locator.fill(text);
    }

    // Clear and type
    async clearAndType(locator, text) {
        await locator.clear();
        await locator.fill(text);
    }

    // Get text
    async getText(locator) {
        return await locator.textContent();
    }

    // Scroll
    async scrollIntoView(locator) {
        await locator.scrollIntoViewIfNeeded();
    }

    // Screenshot
    async takeScreenshot(name) {
        await this.page.screenshot({
            path: `screenshots/${name}.png`,
            fullPage: true
        });
    }

    // Verify text
    async verifyText(locator, expected) {

        const actual = (await locator.textContent()).trim();

        if (actual === expected)
            console.log("PASS");
        else
            console.log(`FAIL Expected: ${expected} Actual: ${actual}`);
    }

    // Wait for loader
    async waitForLoader(loaderLocator) {
        await loaderLocator.waitFor({
            state: 'hidden'
        });
    }

    // Upload file
    async uploadFile(locator, filePath) {
        await locator.setInputFiles(filePath);
    }

}

module.exports = CommonFunctions;