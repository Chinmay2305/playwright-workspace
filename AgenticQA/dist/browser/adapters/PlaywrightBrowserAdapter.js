import { chromium } from "@playwright/test";
import { logger } from "../../utils/Logger.js";
export class PlaywrightBrowserAdapter {
    browser;
    context;
    page;
    async launch(headless) {
        logger.info("Launching Playwright Browser...");
        this.browser = await chromium.launch({
            headless
        });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
        logger.info("Browser, Context and Page created.");
    }
    async close() {
        logger.info("Closing Playwright Browser...");
        await this.browser.close();
        logger.info("Browser Closed.");
    }
    getBrowser() {
        return this.browser;
    }
    getContext() {
        return this.context;
    }
    getPage() {
        return this.page;
    }
}
//# sourceMappingURL=PlaywrightBrowserAdapter.js.map