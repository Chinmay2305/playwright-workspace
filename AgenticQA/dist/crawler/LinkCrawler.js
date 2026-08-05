export class LinkCrawler {
    async discoverLinks(page, baseUrl) {
        const hrefs = await page.$$eval("a[href]", anchors => anchors
            .map(a => a.getAttribute("href"))
            .filter(Boolean));
        const links = hrefs
            .map(link => {
            try {
                return new URL(link, baseUrl).toString();
            }
            catch {
                return null;
            }
        })
            .filter((url) => url !== null);
        return [...new Set(links)];
    }
}
//# sourceMappingURL=LinkCrawler.js.map