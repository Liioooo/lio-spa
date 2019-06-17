const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    entry: [
        './src/styles.scss',
        './src/polyfills.ts',
        './src/main.ts'
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true,
                            removeComments: false,
                            attrs: [':data-src']
                        }
                    }
                ]
            },
            {
                test:/\.component.scss$/,
                use:  [
                    "to-string-loader",
                    { loader: 'css-loader'},
                    { loader: 'sass-loader'},
                ]
            },
            {
                test:/styles.scss$/,
                use:  [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    'ts-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname, '..', 'node_modules/lit-html'),
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: "src/index.html",
                filename: "./index.html"
            }
        ),
        new MiniCssExtractPlugin({
            filename: "styles.[hash].css"
        }),
        new CopyWebpackPlugin([
            {from:'src/assets',to:'assets'}
        ]),
        new ProgressBarPlugin()
    ],
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'bundle.[hash].js',
        path: path.join(__dirname, '..', 'dist')
    }
};
