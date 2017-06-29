//https://github.com/webpack/docs/wiki/list-of-plugins

var Webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var Helpers = require('./helpers');

module.exports = {
    resolve: {
        extensions: ['.ts', '.js']
    },
    entry: {
        app: './src/app/main.aot.ts',
        vendor: './src/vendor.ts',
        polyfills: './src/polyfills.ts'
    },
    module: {
        loaders: [
          { test: /\.html$/, loader: 'raw-loader' },
          { test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'file-loader?name=assets/[name].[hash].[ext]' },
          { test: /\.css$/, exclude: Helpers.root('src', 'app'), loaders: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })},
          { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] }
        ]
    },
    plugins: [
      new ExtractTextPlugin('[name].[hash].css'),
      new Webpack.optimize.CommonsChunkPlugin({
          name: ['app', 'vendor', 'polyfills']
      }),
      new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: '../index.html'
      })
    ]
};