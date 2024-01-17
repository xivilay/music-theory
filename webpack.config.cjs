const path = require('path');

module.exports = {
    entry: './src/index.mjs',
    mode: 'production',
    target: ['web', 'es5'],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            type: 'commonjs',
        },
    },
    externals: {
        cache: './cache.cjs',
        names: './names.cjs',
    },
    externalsType: 'commonjs',
    module: {
        rules: [
            {
                test: /\.(mjs)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: 'ie 9',
                            },
                        ],
                    ],
                },
            },
        ],
    }
};
