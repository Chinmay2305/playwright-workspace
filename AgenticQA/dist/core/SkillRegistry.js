/**
 * Stores all available skills.
 */
export class SkillRegistry {
    skills = new Map();
    /**
     * Registers a skill.
     */
    register(skill) {
        this.skills.set(skill.name, skill);
    }
    /**
     * Gets a skill by name.
     */
    get(name) {
        const skill = this.skills.get(name);
        if (!skill) {
            throw new Error(`Skill '${name}' is not registered.`);
        }
        return skill;
    }
}
//# sourceMappingURL=SkillRegistry.js.map