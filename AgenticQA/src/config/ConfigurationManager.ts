import fs from "fs";
import yaml from "yaml";
import type { AppConfiguration } from "../models/AppConfiguration.js";

export class ConfigurationManager {

    static load(): AppConfiguration {

        const file = fs.readFileSync(
            "configs/default.yaml",
            "utf8"
        );

        return yaml.parse(file);

    }

}