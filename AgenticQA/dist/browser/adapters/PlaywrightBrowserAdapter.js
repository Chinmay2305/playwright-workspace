import { chromium } from "@playwright/test";
import { logger } from "../../utils/Logger.js";
export class PlaywrightBrowserAdapter {
    browser;
    async launch(headless) {
        logger.info("Launching Playwright Browser...");
        this.browser = await chromium.launch({
            headless
        });
        return this.browser;
    }
    async close() {
        logger.info("Closing Playwright Browser...");
        await this.browser.close();
    }
    getBrowser() {
        return this.browser;
    }
}
//# sourceMappingURL=PlaywrightBrowserAdapter.js.map