//var sourceFiles = require('./components/karma-config/sourceFiles');

module.exports = function (config) {
    var configuration = {
        
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '.',
        
        
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['systemjs', 'jasmine'],
        plugins: ['karma-systemjs', 'karma-jasmine', 'karma-firefox-launcher'],
        systemjs: {
            // Path to your SystemJS configuration file
            configFile: './system.conf.js',
            serveFiles: [
                '/lib/*.ts',
                '/lib/expected-expressions/*.ts',
                '/lib/expression-matchers/*.ts',
                '/lib/expression-formatters/*.ts'
            ],
            includeFiles: [
                'node_modules/es6-shim/es6-shim.js'
            ]
        },
        
        // list of files / patterns to load in the browser
        files: [
            { pattern: './tests/*.ts', served: true, included: true },
            { pattern: './tests/**/*.ts', served: true, included: true },
        ],
        
        // list of files to exclude
        exclude: [
        ],
        
        
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },
        
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots'],
        
        
        // web server port
        port: 9876,
        
        
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        
        
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        
        
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        
        
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['FirefoxDeveloper'],
        // browsers: ['Chrome'],
        
        
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        browserNoActivityTimeout: 100000
    };
    //configuration.systemjs.serveFiles = configuration.systemjs.serveFiles.concat(sourceFiles.sourceFiles());
    config.set(configuration);
}
