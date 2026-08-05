/**
 * Represents the outcome of a skill execution.
 */
export class SkillResult {
    success;
    data;
    error;
    constructor(success, data, error) {
        this.success = success;
        this.data = data;
        this.error = error;
    }
    static ok(data) {
        return new SkillResult(true, data);
    }
    static fail(message) {
        return new SkillResult(false, undefined, message);
    }
}
//# sourceMappingURL=SkillResult.js.map