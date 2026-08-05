import type { Skill } from "../../core/Skill.js";
import type { ExecutionContext } from "../../core/ExecutionContext.js";
import { SkillResult } from "../../core/SkillResult.js";

interface OpenUrlInput {
    url: string;
}

export class OpenUrlSkill implements Skill<OpenUrlInput, void> {

    readonly name = "OpenUrl";

    async execute(
        input: OpenUrlInput,
        context: ExecutionContext
    ): Promise<SkillResult<void>> {

        try {

            const page = context.browserManager.getPage();

            await page.goto(input.url, {
                waitUntil: "networkidle"
            });

            context.logger.info(`Opened URL: ${input.url}`);

            return SkillResult.ok();

        } catch (error) {

            return SkillResult.fail(
                error instanceof Error
                    ? error.message
                    : "Unknown error"
            );
        }

    }

}