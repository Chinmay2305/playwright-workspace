import type { Agent } from "./Agent.js";

/**
 * Represents a sequence of agents that execute together.
 */
export class Workflow {

    constructor(
        public readonly name: string,
        public readonly agents: Agent[]
    ) {}

}