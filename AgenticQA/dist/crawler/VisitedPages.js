export class VisitedPages {
    pages = new Set();
    add(url) {
        this.pages.add(url);
    }
    has(url) {
        return this.pages.has(url);
    }
    all() {
        return [...this.pages];
    }
}
//# sourceMappingURL=VisitedPages.js.map