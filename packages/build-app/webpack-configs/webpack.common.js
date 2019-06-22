const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    entry: [
        path.join(process.cwd(), 'src/polyfills.ts'),
        path.join(process.cwd(), 'src/main.ts'),
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
                test:/\.scss$/,
                use:  [
                    "to-string-loader",
                    { loader: 'css-loader'},
                    { loader: 'sass-loader'},
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
                    path.join(process.cwd(), 'node_modules/lit-html'),
                    path.join(process.cwd(), '..', 'node_modules/lit-html'),
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        // presets: [path.join(__dirname , '..', 'node_modules', '@babel/preset-env')]
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: path.join(process.cwd(), "src/index.html"),
                filename: "./index.html"
            }
        ),
        new MiniCssExtractPlugin({
            filename: "styles.[hash].css"
        }),
        new CopyWebpackPlugin([
            {from: path.join(process.cwd(), 'src/assets'),to:'assets'}
        ]),
        new ProgressBarPlugin()
    ],
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'bundle.[hash].js',
        path: path.join(process.cwd(), 'dist')
    }//,
    // resolveLoader: {
    //     modules: [
    //         path.join(__dirname, '..', 'node_modules')
    //     ]
    // },
};
