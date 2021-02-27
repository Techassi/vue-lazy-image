export type CallbackFunc = () => void;

export interface CallbackTree {
    [key: string]: CallbackFunc;
}

export class Manager {
    private observer!: IntersectionObserver | null;
    private queue!: Array<CallbackFunc>;
    private callbacks!: CallbackTree;
    private uid = 0;

    public constructor() {
        this.queue = new Array<CallbackFunc>();
    }

    public registerObserver(options?: IntersectionObserverInit): void {
        this.observer = new IntersectionObserver(
            this.__internalCallback,
            options
        );
    }

    public register(id: string, callback: CallbackFunc): string {
        if (id == '') {
            id = `vue-lazy-image-${this.uid}`;
            this.uid++;
        }

        const target = document.getElementById(id);
        if (target == null) {
            return 'INVALID';
        }

        if (this.observer != null) {
            this.observer.observe(target);
            this.callbacks[id] = callback;
            return id;
        }

        this.queue.push(callback);
        return id;
    }

    public runQueue(): void {
        this.queue.forEach((callback) => {
            callback();
        });
        this.queue = [];
    }

    private __internalCallback(entries: IntersectionObserverEntry[]): void {
        entries.forEach((entry: IntersectionObserverEntry) => {
            if (!entry.isIntersecting) return;

            const id = entry.target.id;
            const target = document.getElementById(id);
            if (target == null) {
                return;
            }

            this.observer?.unobserve(target);
            this.callbacks[id]();
        });
    }
}

export function createManager(): Manager {
    return new Manager();
}

const manager = createManager();
export default manager;
