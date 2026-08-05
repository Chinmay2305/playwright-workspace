import type { Skill } from "./Skill.js";

/**
 * Stores all available skills.
 */
export class SkillRegistry {

    private readonly skills = new Map<string, Skill>();

    /**
     * Registers a skill.
     */
    register(skill: Skill): void {

        this.skills.set(skill.name, skill);

    }

    /**
     * Gets a skill by name.
     */
    get(name: string): Skill {

        const skill = this.skills.get(name);

        if (!skill) {

            throw new Error(`Skill '${name}' is not registered.`);

        }

        return skill;

    }

}