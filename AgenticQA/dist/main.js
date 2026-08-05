import { ConfigurationManager } from "./config/ConfigurationManager.js";
import { BrowserManager } from "./browser/BrowserManager.js";
import { logger } from "./utils/Logger.js";
async function main() {
    logger.info("AI QA Agent Started");
    const config = ConfigurationManager.load();
    const browserManager = new BrowserManager(config);
    await browserManager.launch(config.headless);
    await browserManager.close();
    logger.info("Execution Finished");
}
main();
//# sourceMappingURL=main.js.map