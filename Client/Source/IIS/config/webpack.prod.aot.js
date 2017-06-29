var Webpack = require('webpack');
var WebpackMerge = require('webpack-merge');
var CommonConfig = require('./webpack.common.aot.js');
var NgToolsWebpack = require('@ngtools/webpack');

var Helpers = require('./helpers');

console.log(Helpers.root('.'));

module.exports = WebpackMerge(CommonConfig, {
    output: {
        path: Helpers.root('dist'),
        publicPath: '/transact/client/dist/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: '@ngtools/webpack'
        }]
    },
    plugins: [
      new NgToolsWebpack.AotPlugin({
          tsConfigPath: './tsconfig.json',
          entryModule: Helpers.root('.') + '/src/app/app.module#AppModule'
      }),
      new Webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
      }),
      new Webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          },
          output: {
              comments: false
          },
          sourceMap: false
      })
    ]
});