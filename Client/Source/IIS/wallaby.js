var wallabyWebpack = require('wallaby-webpack');

var webpackPostprocessor = wallabyWebpack({
    entryPatterns: [
      'spec-bundle.js',
      'src/**/*spec.js'
    ],

    module: {
        loaders: [
          { test: /\.css$/, loader: 'raw-loader' },
          { test: /\.html$/, loader: 'raw-loader' },
          { test: /\.json$/, loader: 'json-loader' },
          { test: /\.styl$/, loaders: ['raw-loader', 'stylus-loader'] },
          { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] },
          { test: /\.(jpg|png)$/, loader: 'url-loader?limit=128000' },
          { test: /\.js$/, loader: 'angular2-template-loader', exclude: /node_modules/ }
        ]
    }
});

var compilerOptions = require('./tsconfig.json').compilerOptions;

module.exports = function (wallaby) {

    return {
        files: [
          { pattern: 'spec-bundle.js', load: false },
          { pattern: 'src/**/*.ts', load: false },
          { pattern: 'src/**/*.d.ts', ignore: true },
          { pattern: 'src/**/*.css', load: false },
          { pattern: 'src/**/*.scss', load: false },
          { pattern: 'src/**/*.html', load: false },
          { pattern: 'src/**/*spec.ts', ignore: true }
        ],

        tests: [
          { pattern: 'src/**/*spec.ts', load: false, debug: true }
        ],

        testFramework: 'jasmine',

        compilers: {
            '**/*.ts': wallaby.compilers.typeScript(compilerOptions)
        },

        env: {
            kind: 'electron'
        },

        postprocessor: webpackPostprocessor,

        setup: function () {
            window.__moduleBundler.loadTests();
        },
        workers: {
            initial: 8,
            regular: 6
        },
        debug: false 
    };
};