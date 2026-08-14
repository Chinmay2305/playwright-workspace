import { SkillResult } from "../../core/SkillResult.js";
export class LoginSkill {
    name = "LoginSkill";
    async execute(input, context) {
        try {
            const page = context.browserManager.getPage();
            await page.locator("[name='UsernameEmail']").fill(input.username);
            await page.locator("[name='Password']").fill(input.password);
            await page.locator("input[type='submit']").click();
            context.logger.info(`Login attempted for ${input.username}`);
            return SkillResult.ok();
        }
        catch (error) {
            return SkillResult.fail(error instanceof Error
                ? error.message
                : "Unknown login error");
        }
    }
}
//# sourceMappingURL=LoginSkill.js.map