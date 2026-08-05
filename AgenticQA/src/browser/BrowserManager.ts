import { BrowserFactory } from "./factories/BrowserFactory.js";
import type { IBrowserAdapter } from "./interfaces/IBrowserAdapter.js";
import type { AppConfiguration } from "../models/AppConfiguration.js";
import { logger } from "../utils/Logger.js";

export class BrowserManager {

    private readonly adapter: IBrowserAdapter;

    constructor(config: AppConfiguration) {
        this.adapter = BrowserFactory.create(config.browser.type);
    }

    async launch(headless: boolean): Promise<void> {

        logger.info("Browser Manager starting browser...");

        await this.adapter.launch(headless);
    }

    getBrowser() {
        return this.adapter.getBrowser();
    }

    getContext() {
        return this.adapter.getContext();
    }

    getPage() {
        return this.adapter.getPage();
    }

    async close(): Promise<void> {
        await this.adapter.close();
    }

}