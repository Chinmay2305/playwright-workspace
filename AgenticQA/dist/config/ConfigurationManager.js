import fs from "fs";
import yaml from "yaml";
export class ConfigurationManager {
    static load() {
        const file = fs.readFileSync("configs/default.yaml", "utf8");
        return yaml.parse(file);
    }
}
//# sourceMappingURL=ConfigurationManager.js.map