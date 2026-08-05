import type { Browser, BrowserContext, Page } from "@playwright/test";

export interface IBrowserAdapter {

    launch(headless: boolean): Promise<void>;

    close(): Promise<void>;

    getBrowser(): Browser;

    getContext(): BrowserContext;

    getPage(): Page;
}