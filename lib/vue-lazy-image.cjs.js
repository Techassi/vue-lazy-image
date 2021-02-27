// Copyright (c) 2020-present Techassi
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.
// vue-lazy-image 1.0.0 build 27/2/2021
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

class Manager {
    constructor() {
        this.observer = null;
        this.uid = 0;
        this.queue = new Array();
    }
    registerObserver(options) {
        this.observer = new IntersectionObserver(this.__internalCallback, options);
    }
    register(id, callback) {
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
    runQueue() {
        this.queue.forEach((callback) => {
            callback();
        });
        this.queue = [];
    }
    __internalCallback(entries) {
        entries.forEach((entry) => {
            if (!entry.isIntersecting)
                return;
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
function createManager() {
    return new Manager();
}
const manager = createManager();

const EMPTY_IMAGE_DATA_URL = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

const image = vue.defineComponent({
    name: 'LazyImage',
    props: {
        src: {
            type: String,
            default: EMPTY_IMAGE_DATA_URL,
            required: true,
        },
        id: {
            type: String,
            default: '',
        },
        usePicture: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isIntersected: false,
            isLoaded: false,
            isError: false,
            uid: '',
        };
    },
    computed: {
        imageSrc() {
            return this.isIntersected ? this.src : EMPTY_IMAGE_DATA_URL;
        },
    },
    render() {
        const img = vue.h('img', {
            class: [
                'vue-lazy-image',
                { loaded: this.isLoaded, error: this.isError },
            ],
            src: this.imageSrc,
            id: this.uid,
            onLoad: this.loaded,
            onError: this.error,
        });
        if (!this.usePicture) {
            return img;
        }
        if (this.$slots.default == undefined) {
            return;
        }
        return vue.h('picture', { onLoad: this.loaded, onError: this.error }, this.isIntersected ? [this.$slots.default(), img] : [img]);
    },
    mounted() {
        this.uid = manager.register(this.id, this.intersected);
    },
    methods: {
        intersected() {
            this.isIntersected = true;
            this.$emit('intersected', this.$el);
        },
        loaded() {
            this.isLoaded = true;
            this.$emit('loaded', this.$el);
        },
        error() {
            this.isError = true;
            this.$emit('error', this.$el);
        },
    },
});

const plugin = {
    install(app, options) {
        if (typeof window === 'undefined' || typeof document === 'undefined')
            return;
        if (!('IntersectionObserver' in window))
            return;
        app.component('lazy-image', image);
        manager.registerObserver(options[0]);
        manager.runQueue();
    },
};

exports.default = plugin;
exports.manager = manager;
