import type { ExecutionContext } from "./ExecutionContext.js";
import { SkillResult } from "./SkillResult.js";

export interface Skill<TInput = unknown, TResult = unknown> {

    readonly name: string;

    execute(
        input: TInput,
        context: ExecutionContext
    ): Promise<SkillResult<TResult>>;

}