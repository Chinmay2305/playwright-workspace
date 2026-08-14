import fs from "fs";
import path from "path";
export class TestDataLoader {
    static loadJson(relativePath) {
        const filePath = path.join(process.cwd(), relativePath);
        const content = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(content);
    }
}
//# sourceMappingURL=TestDataLoader.js.map