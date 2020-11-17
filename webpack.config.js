/* eslint-disable no-undef */
const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.svg$/,
                use: 'file-loader',
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            mimetype: 'image/png',
                        },
                    },
                ],
            },
        ],
    },
};

module.exports = config;
