let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: 'styles.css',
});

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            },
        ],
        rules: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [
                    { loader: "css-loader", options: { sourceMap: true }},
                    { loader: "sass-loader", options: { sourceMap: true }}
                ],
                // use style-loader in development
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        extractSass
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map',
    watch: true
};