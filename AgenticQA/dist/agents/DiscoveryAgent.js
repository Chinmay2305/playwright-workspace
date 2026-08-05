import { KnowledgeManager } from "../storage/KnowledgeManager.js";
import { PageAnalyzer } from "../analyzers/PageAnalyzer.js";
import { LinkCrawler } from "../crawler/LinkCrawler.js";
export class DiscoveryAgent {
    name = "Discovery Agent";
    async execute(context) {
        const page = context.browserManager.getPage();
        const analyzer = new PageAnalyzer();
        const model = await analyzer.analyze(page);
        context.logger.info("===== APPLICATION MAP =====");
        console.log(model);
        KnowledgeManager.save(model);
        const crawler = new LinkCrawler();
        const links = await crawler.discoverLinks(page, model.url);
        context.logger.info("===== DISCOVERED LINKS =====");
        console.log(links);
        context.logger.info("Knowledge saved successfully.");
        return model;
    }
}
//# sourceMappingURL=DiscoveryAgent.js.map