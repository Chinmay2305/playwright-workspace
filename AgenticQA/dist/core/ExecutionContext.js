import { logger } from "../utils/Logger.js";
export class ExecutionContext {
    config;
    browserManager;
    constructor(config, browserManager) {
        this.config = config;
        this.browserManager = browserManager;
    }
    logger = logger;
}
//# sourceMappingURL=ExecutionContext.js.map