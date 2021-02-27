import { PropType } from 'vue';
declare const image: import("vue").DefineComponent<{
    src: {
        type: PropType<string>;
        default: string;
        required: true;
    };
    id: {
        type: PropType<string>;
        default: string;
    };
    usePicture: {
        type: PropType<boolean>;
        default: boolean;
    };
}, unknown, {
    isIntersected: boolean;
    isLoaded: boolean;
    isError: boolean;
    uid: string;
}, {
    imageSrc(): string;
}, {
    intersected(): void;
    loaded(): void;
    error(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    src: string;
    id: string;
    usePicture: boolean;
} & {}>, {
    src: string;
    id: string;
    usePicture: boolean;
}>;
export default image;
