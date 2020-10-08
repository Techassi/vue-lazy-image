const { version } = require('./package.json');

const banner = `// Copyright © 2020-present Techassi
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.
// vue-lazy-image ${version}`;

export default {
    input: './src/index.js',
    output: [
        {
            file: './lib/vue-lazy-image.esm.js',
            banner,
            format: 'esm',
            globals: {
                vue: 'Vue',
            },
        },
        {
            file: './lib/vue-lazy-image.umd.js',
            name: 'VueYouTubeEmbed',
            banner,
            format: 'umd',
            exports: 'named',
            globals: {
                vue: 'Vue',
            },
        },
    ],
};
