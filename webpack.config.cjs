const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            type: 'module',
        },
    },
    externals: {
        cache: './cache.js',
        names: './names.js',
    },
    externalsType: 'module',
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
