import fs from "fs";
import path from "path";
import type { PageModel } from "../models/PageModel.js";

export class KnowledgeManager {

    private static readonly folder = "knowledge";

    static save(page: PageModel): void {

        if (!fs.existsSync(this.folder)) {
            fs.mkdirSync(this.folder);
        }

        const file = path.join(this.folder, "page.json");

        fs.writeFileSync(
            file,
            JSON.stringify(page, null, 4)
        );

    }

    static load(): PageModel | null {

        const file = path.join(this.folder, "page.json");

        if (!fs.existsSync(file))
            return null;

        return JSON.parse(
            fs.readFileSync(file, "utf-8")
        ) as PageModel;

    }

}