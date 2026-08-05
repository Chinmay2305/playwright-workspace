export class CrawlQueue {

    private queue: string[] = [];

    enqueue(url: string) {

        if (!this.queue.includes(url)) {

            this.queue.push(url);

        }

    }

    dequeue(): string | undefined {

        return this.queue.shift();

    }

    isEmpty(): boolean {

        return this.queue.length === 0;

    }

}