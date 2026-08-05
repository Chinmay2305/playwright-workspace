import { BrowserFactory } from "./factories/BrowserFactory.js";
import type { AppConfig } from "../config/ConfigurationManager.js";
import { logger } from "../utils/Logger.js";

export class BrowserManager {

    private adapter;

    constructor(config: AppConfig) {

        this.adapter = BrowserFactory.create(config.browser);

    }

    async launch(headless: boolean) {

        logger.info("Browser Manager starting browser...");

        return await this.adapter.launch(headless);

    }

    async close() {

        await this.adapter.close();

    }

}