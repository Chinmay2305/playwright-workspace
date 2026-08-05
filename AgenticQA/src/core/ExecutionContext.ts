import type { AppConfig } from "../config/ConfigurationManager.js";
import { BrowserManager } from "../browser/BrowserManager.js";
import { logger } from "../utils/Logger.js";

export class ExecutionContext {

    constructor(
        public readonly config: AppConfig,
        public readonly browserManager: BrowserManager
    ) {}

    public readonly logger = logger;
}