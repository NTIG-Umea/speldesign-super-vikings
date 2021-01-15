/* eslint-disable no-undef */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env) => {
    if (env == undefined) env = { production: false };

    const config = {
        entry: './src/index.js',
        output: {
            path: path.resolve(
                __dirname + '/dist',
                env.production ? 'prod' : 'dev'
            ),
            filename: 'bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.png|\.svg?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name() {
                                    if (env.production) {
                                        return '[path][name].[ext]';
                                    }

                                    return '[contenthash].[ext]';
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.fs(h)?$/,
                    use: [
                        {
                            loader: 'raw-loader',
                        },
                    ],
                },
            ],
        },
        plugins: [],
    };

    if (!env.production) {
        config.plugins.push(
            new HtmlWebpackPlugin({
                title: 'Super-Vikings Development Endpoint',
            }),
            // new WebpackFreeTexPacker(path.resolve(__dirname, 'assets/atlases'))
        );
    }
    return config;
};
