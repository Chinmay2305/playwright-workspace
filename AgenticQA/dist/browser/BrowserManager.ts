import { chromium, Browser } from "@playwright/test";
import { AppConfig } from "../config/ConfigurationManager";
import { logger } from "../utils/Logger";

export class BrowserManager {

    private browser!: Browser;

    public async launch(config: AppConfig): Promise<Browser> {

        logger.info("Launching Browser...");

        this.browser = await chromium.launch({

            headless: config.headless

        });

        logger.info("Browser Launched.");

        return this.browser;

    }

    public async close() {

        logger.info("Closing Browser...");

        await this.browser.close();

        logger.info("Browser Closed.");

    }

}