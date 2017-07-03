var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: '/lsg/client/dist/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    plugins: [
      new ExtractTextPlugin('[name].[hash].css')
    ],
    devServer: {
        port: 8081,
        proxy: {
            '**': {
                target: 'http://localhost/lsg/client',
                secure: false,
                changeOrigin: true
            }
        }
    }
});