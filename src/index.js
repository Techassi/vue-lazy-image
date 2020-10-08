import LazyImage from './image';
import manager from './manager';

const plugin = {
    install: (app) => {
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            return;
        }
        if (!('IntersectionObserver' in window)) {
            return;
        }

        app.component('lazy-image', LazyImage);
        manager.registerObserver();
        manager.runBacklog();
    },
};

export default plugin;
