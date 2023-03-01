import type { App, Plugin } from 'vue';

import manager from './manager';
import LazyImage from './image';

const plugin: Plugin = {
  install(app: App, options: any[]): void {
    if (typeof window === 'undefined' || typeof document === 'undefined')
      return;

    if (!('IntersectionObserver' in window)) return;

    app.component('LazyImage', LazyImage);
    manager.registerObserver(options[0]);
    manager.runQueue();
  },
};


export default plugin;

export { default as manager } from './manager';