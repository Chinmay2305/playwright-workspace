import { BrowserFactory } from "./factories/BrowserFactory.js";
import { logger } from "../utils/Logger.js";
export class BrowserManager {
    adapter;
    constructor(config) {
        this.adapter = BrowserFactory.create(config.browser.type);
    }
    async launch(headless) {
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
    async close() {
        await this.adapter.close();
    }
}
//# sourceMappingURL=BrowserManager.js.map