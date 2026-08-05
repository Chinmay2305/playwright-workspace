export class CrawlQueue {
    queue = [];
    enqueue(url) {
        if (!this.queue.includes(url)) {
            this.queue.push(url);
        }
    }
    dequeue() {
        return this.queue.shift();
    }
    isEmpty() {
        return this.queue.length === 0;
    }
}
//# sourceMappingURL=CrawlQueue.js.map