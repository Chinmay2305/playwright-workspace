import type { Browser } from "@playwright/test";

export interface IBrowserAdapter {

    launch(headless: boolean): Promise<Browser>;

    close(): Promise<void>;

    getBrowser(): Browser;

}