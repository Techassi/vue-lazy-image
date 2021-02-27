export declare type CallbackFunc = () => void;
export interface CallbackTree {
    [key: string]: CallbackFunc;
}
export declare class Manager {
    private observer;
    private queue;
    private callbacks;
    private uid;
    constructor();
    registerObserver(options?: IntersectionObserverInit): void;
    register(id: string, callback: CallbackFunc): string;
    runQueue(): void;
    private __internalCallback;
}
export declare function createManager(): Manager;
declare const manager: Manager;
export default manager;
