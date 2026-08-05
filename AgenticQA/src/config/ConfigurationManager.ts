export interface AppConfig {
    browser: string;
    headless: boolean;
    timeout: number;
}

export class ConfigurationManager {

    public static load(): AppConfig {

        return {

            browser: "chromium",

            headless: false,

            timeout: 30000

        };

    }

}