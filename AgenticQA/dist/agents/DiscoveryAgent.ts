import { PageAnalyzer } from "../analyzers/PageAnalyzer.js";
import { KnowledgeManager } from "../storage/KnowledgeManager.js";
import type { ExecutionContext } from "../core/ExecutionContext.js";

export class DiscoveryAgent {

    async execute(context: ExecutionContext): Promise<void> {

        const page = context.browserManager.getPage();

        const analyzer = new PageAnalyzer();

        const pageModel = await analyzer.analyze(page);

        context.logger.info("===== APPLICATION MAP =====");
        console.dir(pageModel, { depth: null });

        KnowledgeManager.save(pageModel);

    }

}