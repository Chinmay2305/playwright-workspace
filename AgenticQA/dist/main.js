import { ConfigurationManager } from "./config/ConfigurationManager.js";
import { BrowserManager } from "./browser/BrowserManager.js";
import { logger } from "./utils/Logger.js";
import { ExecutionContext } from "./core/ExecutionContext.js";
import { OpenUrlSkill } from "./skills/browser/OpenUrlSkill.js";
import { DiscoveryAgent } from "./agents/DiscoveryAgent.js";
async function main() {
    logger.info("AgenticQA Started");
    const config = ConfigurationManager.load();
    const browserManager = new BrowserManager(config);
    await browserManager.launch(config.browser.headless);
    const context = new ExecutionContext(config, browserManager);
    //------------------------------------
    // Open Website
    //------------------------------------
    const openUrlSkill = new OpenUrlSkill();
    const result = await openUrlSkill.execute({
        url: config.application.url
    }, context);
    if (!result.success) {
        logger.error(result.error ?? "Failed to open URL.");
        await browserManager.close();
        return;
    }
    //------------------------------------
    // Discover Application
    //------------------------------------
    const discoveryAgent = new DiscoveryAgent();
    await discoveryAgent.execute(context);
    //------------------------------------
    // Wait
    //------------------------------------
    await new Promise(resolve => setTimeout(resolve, 3000));
    //------------------------------------
    // Close Browser
    //------------------------------------
    await browserManager.close();
    logger.info("Execution Finished");
}
main().catch(error => {
    logger.error(error instanceof Error
        ? error.stack ?? error.message
        : String(error));
});
//# sourceMappingURL=main.js.map