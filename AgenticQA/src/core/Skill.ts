import type { ExecutionContext } from "./ExecutionContext.js";
import { SkillResult } from "./SkillResult.js";

/**
 * Every executable action inside AgenticQA
 * implements this interface.
 */
export interface Skill<TInput = unknown, TResult = unknown> {

    /**
     * Unique skill name.
     */
    readonly name: string;

    /**
     * Executes the skill.
     */
    execute(
        input: TInput,
        context: ExecutionContext
    ): Promise<SkillResult<TResult>>;
}