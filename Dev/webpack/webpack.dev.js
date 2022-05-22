const Path = require('path')
const Webpack = require('webpack')
const { merge } = require('webpack-merge')

const webpackCommon = require('./webpack.common')

module.exports = merge(webpackCommon, {
    target: 'web',
    mode: 'development',
    devtool: 'source-map',
    output: {
        chunkFilename: 'js/[name].chunk.js'
    },
    watchOptions: {
        ignored: /node_modules/
    },
    devServer: {
        static: {
            directory: Path.resolve(__dirname, 'public')
        },
        client: {
          logging: 'error',
        },
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: Path.resolve(__dirname, '../src'),
                loader: 'babel-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: false,
                                outputStyle: 'compressed'
                            }
                        }
                    }
                ],
            }
        ]
    }
})