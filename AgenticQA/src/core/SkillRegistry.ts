import type { Skill } from "./Skill.js";

export class SkillRegistry {

    private readonly skills = new Map<string, Skill>();

    register(skill: Skill): void {

        this.skills.set(skill.name, skill);

    }

    get(name: string): Skill {

        const skill = this.skills.get(name);

        if (!skill) {

            throw new Error(`Skill '${name}' not registered.`);

        }

        return skill;

    }

}