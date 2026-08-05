export class SkillRegistry {
    skills = new Map();
    register(skill) {
        this.skills.set(skill.name, skill);
    }
    get(name) {
        const skill = this.skills.get(name);
        if (!skill) {
            throw new Error(`Skill '${name}' not registered.`);
        }
        return skill;
    }
}
//# sourceMappingURL=SkillRegistry.js.map