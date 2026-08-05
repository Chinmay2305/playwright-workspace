import type { ExecutionContext } from "./ExecutionContext.js";

/**
 * Every AI Agent must implement this interface.
 */
export interface Agent {

    readonly name: string;

    execute(
        context: ExecutionContext
    ): Promise<void>;
}