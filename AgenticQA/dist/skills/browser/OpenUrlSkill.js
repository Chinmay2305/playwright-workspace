import { SkillResult } from "../../core/SkillResult.js";
export class OpenUrlSkill {
    name = "OpenUrl";
    async execute(input, context) {
        try {
            const page = context.browserManager.getPage();
            await page.goto(input.url, {
                waitUntil: "networkidle"
            });
            context.logger.info(`Opened URL: ${input.url}`);
            return SkillResult.ok();
        }
        catch (error) {
            return SkillResult.fail(error instanceof Error
                ? error.message
                : "Unknown error");
        }
    }
}
//# sourceMappingURL=OpenUrlSkill.js.map