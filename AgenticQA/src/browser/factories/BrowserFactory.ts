import { PlaywrightBrowserAdapter } from "../adapters/PlaywrightBrowserAdapter.js";
import type { IBrowserAdapter } from "../interfaces/IBrowserAdapter.js";

export class BrowserFactory {

    static create(browser: string): IBrowserAdapter {

        switch (browser.toLowerCase()) {

            case "chromium":
                return new PlaywrightBrowserAdapter();

            default:
                throw new Error(`Browser ${browser} is not supported.`);
        }

    }

}