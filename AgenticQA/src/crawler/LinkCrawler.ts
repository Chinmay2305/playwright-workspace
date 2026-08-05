import type { Page } from "@playwright/test";

export class LinkCrawler {

    async discoverLinks(
        page: Page,
        baseUrl: string
    ): Promise<string[]> {

        const hrefs = await page.$$eval(
            "a[href]",
            anchors =>
                anchors
                    .map(a => a.getAttribute("href"))
                    .filter(Boolean) as string[]
        );

        const links = hrefs
            .map(link => {
                try {
                    return new URL(link, baseUrl).toString();
                } catch {
                    return null;
                }
            })
            .filter((url): url is string => url !== null);

        return [...new Set(links)];
    }

}