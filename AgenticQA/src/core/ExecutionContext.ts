import type { AppConfiguration } from "../models/AppConfiguration.js";
import { BrowserManager } from "../browser/BrowserManager.js";
import { logger } from "../utils/Logger.js";

export class ExecutionContext {

    constructor(
        public readonly config: AppConfiguration,
        public readonly browserManager: BrowserManager
    ) {}

    public readonly logger = logger;

}