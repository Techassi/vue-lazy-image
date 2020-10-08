import { h } from 'vue';
import manager from './manager';

const image = {
    name: 'LazyImage',
    props: {
        src: {
            type: String,
            required: true,
            default: false,
        },
        id: {
            type: String,
            required: true,
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
        };
    },
    computed: {
        imageSrc() {
            return this.isIntersected
                ? this.src
                : 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        },
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
    render() {
        const img = h('img', {
            class: [
                'vue-lazy-image',
                { loaded: this.isLoaded, error: this.isError },
            ],
            src: this.imageSrc,
            id: this.id,
            onLoad: this.loaded,
            onError: this.error,
        });

        if (!this.usePicture) {
            return img;
        }

        return h(
            'picture',
            { onLoad: this.loaded, onError: this.error },
            this.intersected ? [this.$slots.default(), img] : [img]
        );
    },
    mounted() {
        manager.register(this.id, this.intersected);
    },
};

export default image;
