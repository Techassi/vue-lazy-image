import { h, defineComponent, PropType } from 'vue';

import { EMPTY_IMAGE_DATA_URL } from './constants';

import manager from './manager';

const image = defineComponent({
    name: 'LazyImage',
    props: {
        src: {
            type: String as PropType<string>,
            default: EMPTY_IMAGE_DATA_URL,
            required: true,
        },
        id: {
            type: String as PropType<string>,
            default: '',
        },
        usePicture: {
            type: Boolean as PropType<boolean>,
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
        imageSrc(): string {
            return this.isIntersected ? this.src : EMPTY_IMAGE_DATA_URL;
        },
    },
    render() {
        const img = h('img', {
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

        return h(
            'picture',
            { onLoad: this.loaded, onError: this.error },
            this.isIntersected ? [this.$slots.default(), img] : [img]
        );
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

export default image;
