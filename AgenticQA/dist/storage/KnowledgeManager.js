import fs from "fs";
import path from "path";
export class KnowledgeManager {
    static folder = "knowledge";
    static save(page) {
        if (!fs.existsSync(this.folder)) {
            fs.mkdirSync(this.folder);
        }
        const file = path.join(this.folder, "page.json");
        fs.writeFileSync(file, JSON.stringify(page, null, 4));
    }
    static load() {
        const file = path.join(this.folder, "page.json");
        if (!fs.existsSync(file))
            return null;
        return JSON.parse(fs.readFileSync(file, "utf-8"));
    }
}
//# sourceMappingURL=KnowledgeManager.js.map