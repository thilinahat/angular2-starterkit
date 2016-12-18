/**
 * Created by thilina on 12/17/16.
 */
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const webPackServer = 'http://localhost:4444/';
const expressServer = 'http://localhost:8080';

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: webPackServer,
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].css')
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        proxy: {
            '/authenticate': {
                target: expressServer,
                secure: false
            },
            '/verify/user': {
                target: expressServer,
                secure: false
            },
            '/images/*': {
                target: expressServer,
                secure: false
            },
            '/css/*': {
                target: expressServer,
                secure: false
            },
            '/js/*': {
                target: expressServer,
                secure: false
            }
        }
    }
});
