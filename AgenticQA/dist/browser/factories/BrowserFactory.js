import { PlaywrightBrowserAdapter } from "../adapters/PlaywrightBrowserAdapter.js";
export class BrowserFactory {
    static create(browser) {
        switch (browser.toLowerCase()) {
            case "chromium":
                return new PlaywrightBrowserAdapter();
            default:
                throw new Error(`Browser '${browser}' is not supported.`);
        }
    }
}
//# sourceMappingURL=BrowserFactory.js.map