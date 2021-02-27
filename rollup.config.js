import typescript from 'rollup-plugin-typescript2';

import { version } from './package.json';

const now = new Date();
const banner = `// Copyright (c) 2020-present Techassi
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.
// vue-lazy-image ${version} build ${now.getUTCDate()}/${
    now.getUTCMonth() + 1
}/${now.getUTCFullYear()}`;

export default {
    input: './src/index.ts',
    output: [
        {
            file: './lib/vue-lazy-image.esm.js',
            banner,
            format: 'esm',
            exports: 'named',
            globals: {
                vue: 'vue',
            },
        },
        {
            file: './lib/vue-lazy-image.umd.js',
            name: 'VueLazyImage',
            banner,
            format: 'umd',
            exports: 'named',
            globals: {
                vue: 'vue',
            },
        },
        {
            file: './lib/vue-lazy-image.cjs.js',
            banner,
            format: 'cjs',
            exports: 'named',
            globals: {
                vue: 'vue',
            },
        },
        {
            file: './lib/vue-lazy-image.global.js',
            name: 'VueLazyImage',
            banner,
            format: 'iife',
            exports: 'named',
            globals: {
                vue: 'vue',
            },
        },
    ],
    external: ['vue'],
    plugins: [
        typescript({
            useTsconfigDeclarationDir: true,
        }),
    ],
};
