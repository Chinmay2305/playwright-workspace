import type { Skill } from "../../core/Skill.js";
import type { ExecutionContext } from "../../core/ExecutionContext.js";
import { SkillResult } from "../../core/SkillResult.js";

interface LoginInput {

    username: string;

    password: string;

}

export class LoginSkill implements Skill<LoginInput, void> {

    readonly name = "LoginSkill";

    async execute(

        input: LoginInput,

        context: ExecutionContext

    ): Promise<SkillResult<void>> {

        try {

            const page = context.browserManager.getPage();

            await page.locator("[name='UsernameEmail']").fill(input.username);

            await page.locator("[name='Password']").fill(input.password);

            await page.locator("input[type='submit']").click();

            context.logger.info(`Login attempted for ${input.username}`);

            return SkillResult.ok();

        }

        catch (error) {

            return SkillResult.fail(

                error instanceof Error

                    ? error.message

                    : "Unknown login error"

            );

        }

    }

}