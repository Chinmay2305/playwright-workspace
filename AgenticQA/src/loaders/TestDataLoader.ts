import fs from "fs";
import path from "path";

export class TestDataLoader {

    static loadJson<T>(relativePath: string): T {

        const filePath = path.join(process.cwd(), relativePath);

        const content = fs.readFileSync(filePath, "utf-8");

        return JSON.parse(content) as T;
    }

}