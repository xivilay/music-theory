const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    target: ['web', 'es5'],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            type: 'module',
        },
    },
    externals: {
        cache: './cache.cjs',
        names: './names.cjs',
    },
    externalsType: 'node-commonjs',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
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
    },
    experiments: {
        outputModule: true,
    },
};
