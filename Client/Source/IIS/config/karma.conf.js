var webpackConfig = require('./webpack.test');

module.exports = function (config) {
    var _config = {
        basePath: '',

        frameworks: ['jasmine'],

        files: [
            { pattern: './config/karma-test-shim.js', watched: false }
        ],

        preprocessors: {
            './config/karma-test-shim.js': ['webpack', 'sourcemap']
            //'**/*.js': ['Electron']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only'
        },

        webpackServer: {
            noInfo: true
        },
        client: {
            useIframe: false
        },

        reporters: ['progress'],
        port: 9878,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Electron'],
        singleRun: true,
        browserNoActivityTimeout: 0
    };

    config.set(_config);
};