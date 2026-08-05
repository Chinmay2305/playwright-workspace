export class VisitedPages {

    private pages = new Set<string>();

    add(url: string) {

        this.pages.add(url);

    }

    has(url: string): boolean {

        return this.pages.has(url);

    }

    all(): string[] {

        return [...this.pages];

    }

}