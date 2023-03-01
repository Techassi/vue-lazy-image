export type CallbackFunction = () => void;

export interface CallbackTree {
  [key: string]: CallbackFunction;
}

export class Manager {
  private observer!: IntersectionObserver;
  private queue!: Array<CallbackFunction>;
  private callbacks!: CallbackTree;
  private uid = 0;

  public constructor() {
    this.queue = new Array<CallbackFunction>();
  }

  public registerObserver(options?: IntersectionObserverInit): void {
    this.observer = new IntersectionObserver(
      this.__internalCallback,
      options,
    );
  }

  public register(id: string, callback: CallbackFunction): string {
    if (id === '') {
      id = `vue-lazy-image-${this.uid}`;
      this.uid++;
    }

    const target = document.querySelector(`#${id}`);
    if (!target)
      return 'INVALID';

    if (this.observer !== undefined) {
      this.observer.observe(target);
      this.callbacks[id] = callback;
      return id;
    }

    this.queue.push(callback);
    return id;
  }

  public runQueue(): void {
    for (const callback of this.queue)
      callback();

    this.queue = [];
  }

  private __internalCallback(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      if (!entry.isIntersecting) return;

      const id = entry.target.id;

      const target = document.querySelector(`#${id}`);
      if (!target)
        return;

      this.observer?.unobserve(target);
      this.callbacks[id]();
    }
  }
}

export function createManager(): Manager {
  return new Manager();
}

const manager = createManager();
export default manager;
