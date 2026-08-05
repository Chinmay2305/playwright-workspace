export class PageAnalyzer {
    async analyze(page) {
        const title = await page.title();
        const url = page.url();
        // ------------------------
        // Buttons
        // ------------------------
        const buttons = await page.$$eval("button", buttons => buttons.map(button => ({
            text: button.textContent?.trim() ?? "",
            id: button.id ?? "",
            visible: true
        })));
        // ------------------------
        // Links
        // ------------------------
        const links = await page.$$eval("a", links => links.map(link => ({
            text: link.textContent?.trim() ?? "",
            href: link.getAttribute("href") ?? "",
            visible: true
        })));
        // ------------------------
        // Inputs
        // ------------------------
        const inputs = await page.$$eval("input", inputs => inputs.map(input => ({
            name: input.getAttribute("name") ?? "",
            type: input.getAttribute("type") ?? "",
            placeholder: input.getAttribute("placeholder") ?? "",
            required: input.required
        })));
        // ------------------------
        // Images
        // ------------------------
        const images = await page.$$eval("img", images => images.map(image => ({
            src: image.getAttribute("src") ?? "",
            alt: image.getAttribute("alt") ?? ""
        })));
        // ------------------------
        // Forms
        // ------------------------
        const forms = await page.$$eval("form", forms => forms.map(form => ({
            action: form.getAttribute("action") ?? "",
            method: form.getAttribute("method") ?? "GET"
        })));
        // ------------------------
        // Tables
        // ------------------------
        const tables = await page.$$eval("table", tables => tables.map(table => ({
            rows: table.rows.length,
            columns: table.rows.length > 0
                ? table.rows[0].cells.length
                : 0
        })));
        return {
            timestamp: new Date().toISOString(),
            title,
            url,
            buttons,
            links,
            inputs,
            images,
            forms,
            tables
        };
    }
}
//# sourceMappingURL=PageAnalyzer.js.map