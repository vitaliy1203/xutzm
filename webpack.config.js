const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug.js');
const devserver = require('./webpack/devserver.js');
const sass = require('./webpack/sass.js');
const css = require('./webpack/css.js');
const extractCSS = require('./webpack/css.extract');
const webpack = require('webpack');
const images = require('./webpack/images.js');


const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'build')
};

const optimization = {
        optimization: {
            minimize: true,
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
        }
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
            }),
          new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            })
        ]
    },
    pug(),
    images()
]);

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        return merge([
            common,
            extractCSS()
        ]);
    }
    if (argv.mode === 'development') {
        return merge([
            common,
            optimization,
            devserver(),
            sass(),
            css()
        ]);
    }
};