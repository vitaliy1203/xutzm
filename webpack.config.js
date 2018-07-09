const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug.js');
const devserver = require('./webpack/devserver.js');
const sass = require('./webpack/sass.js');
const css = require('./webpack/css.js');
const extractCSS = require('./webpack/css.extract');
const webpack = require('webpack');

const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'build')
};

const common = merge([
    {
        entry: {
            'index': PATHS.source + '/pages/index/index.js',
            'blog': PATHS.source + '/pages/blog/blog.js'
        },
        output: {
            path: PATHS.build,
            filename: '[name].js'
        },

        optimization: {
            minimize: false,
            runtimeChunk: {name: 'common'},
            splitChunks: {
                cacheGroups: {
                    default: false,
                    commons: {
                        chunks: 'all',
                        minChunks: 2,
                        name: 'common',
                        enforce: true
                    }
                }
            }
        },

        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['index', 'common'],
                template: PATHS.source + '/pages/index/index.pug'
            }),
            new HtmlWebpackPlugin({
                filename: 'blog.html',
                chunks: ['blog', 'common'],
                template: PATHS.source + '/pages/blog/blog.pug'
            })
        ]
    },
    pug()
]);

module.exports = function (env) {
    if (env === 'production') {
        return merge([
            common,
            extractCSS()
        ]);
    }
    if (env === 'development') {
        return merge([
            common,
            devserver(),
            sass(),
            css()
        ]);
    }
};