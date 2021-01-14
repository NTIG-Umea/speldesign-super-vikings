/* eslint-disable no-undef */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackFreeTexPacker = require('webpack-free-tex-packer');
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
                    test: /\.png|\.svg|\.fs(h)?$/,
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
            ],
        },
        plugins: [],
    };

    if (!env.production) {
        config.plugins.push(
            new HtmlWebpackPlugin({
                title: 'Super-Vikings Development Endpoint',
            }),
            new WebpackFreeTexPacker(path.resolve(__dirname, 'assets/atlases'))
        );
    }
    return config;
};
