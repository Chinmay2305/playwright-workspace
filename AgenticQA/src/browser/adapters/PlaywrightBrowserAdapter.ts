import {
    chromium,
    type Browser,
    type BrowserContext,
    type Page
} from "@playwright/test";

import { logger } from "../../utils/Logger.js";
import type { IBrowserAdapter } from "../interfaces/IBrowserAdapter.js";

export class PlaywrightBrowserAdapter implements IBrowserAdapter {

    private browser!: Browser;
    private context!: BrowserContext;
    private page!: Page;

    async launch(headless: boolean): Promise<void> {

        logger.info("Launching Playwright Browser...");

        this.browser = await chromium.launch({
            headless
        });

        this.context = await this.browser.newContext();

        this.page = await this.context.newPage();

        logger.info("Browser, Context and Page created.");
    }

    async close(): Promise<void> {

        logger.info("Closing Playwright Browser...");

        await this.browser.close();

        logger.info("Browser Closed.");
    }

    getBrowser(): Browser {
        return this.browser;
    }

    getContext(): BrowserContext {
        return this.context;
    }

    getPage(): Page {
        return this.page;
    }
}