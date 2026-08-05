/**
 * Represents the outcome of a skill execution.
 */
export class SkillResult<T = unknown> {

    constructor(
        public readonly success: boolean,
        public readonly data?: T,
        public readonly error?: string
    ) {}

    static ok<T>(data?: T): SkillResult<T> {
        return new SkillResult<T>(true, data);
    }

    static fail(message: string): SkillResult<unknown> {
        return new SkillResult(false, undefined, message);
    }
}