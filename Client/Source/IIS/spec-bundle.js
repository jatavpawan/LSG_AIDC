
require('core-js/es6/symbol');
require('core-js/es6/object');
require('core-js/es6/function');
require('core-js/es6/parse-int');
require('core-js/es6/parse-float');
require('core-js/es6/number');
require('core-js/es6/math');
require('core-js/es6/string');
require('core-js/es6/date');
require('core-js/es6/array');
require('core-js/es6/regexp');
require('core-js/es6/map');
require('core-js/es6/set');
require('core-js/es6/reflect');
require('core-js/es7/reflect');
require('zone.js/dist/zone');

require ('zone.js/dist/long-stack-trace-zone');
require ('zone.js/dist/proxy.js');
require ('zone.js/dist/sync-test');
require ('zone.js/dist/jasmine-patch');
require ('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');

var testing = require('@angular/core/testing');
var testingBrowser = require('@angular/platform-browser-dynamic/testing');

testing.getTestBed().initTestEnvironment(
    testingBrowser.BrowserDynamicTestingModule,
    testingBrowser.platformBrowserDynamicTesting());