import { chromium, type Browser } from "@playwright/test";
import { logger } from "../../utils/Logger.js";
import { IBrowserAdapter } from "../interfaces/IBrowserAdapter.js";

export class PlaywrightBrowserAdapter implements IBrowserAdapter {

    private browser!: Browser;

    async launch(headless: boolean): Promise<Browser> {

        logger.info("Launching Playwright Browser...");

        this.browser = await chromium.launch({
            headless
        });

        return this.browser;
    }

    async close(): Promise<void> {

        logger.info("Closing Playwright Browser...");

        await this.browser.close();
    }

    getBrowser(): Browser {

        return this.browser;
    }

}