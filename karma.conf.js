'use strict';

var webpackConfig = require('./webpack.config.js');
//var path = require('path');
//var entry = 'src/app/bootstrap.js';
//var entry = 'src/' + webpackConfig.entry.app[0];
//var entry = '/Users/filipevelosa/Documents/workspace/arquo/gulp-zurb-webpack-admin/src/app/bootstrap.js';

//var preprocessors = {};
//preprocessors['src/**/*.spec.js'] = ['webpack'];

module.exports = function (config) {
	config.set({
		autoWatch: true,

		frameworks: ['jasmine'],

		browsers: ['PhantomJS'],

		files: [
			'./node_modules/angular/angular.js',
			'./node_modules/angular-mocks/angular-mocks.js',
			'./node_modules/lodash/lodash.js',
			'public/src/**/*.spec.js'
		],

		plugins: [
			require('karma-phantomjs-launcher'),
			require('karma-webpack'),
			require('karma-jasmine'),
			require('karma-coverage')/*,
			require('babel')*/
		],

		preprocessors: {
			'public/src/**/*.spec.js': ['webpack']
		},

		webpack: webpackConfig,

		webpackMiddleware: {
			noInfo: true
		},

		coverageReporter: {
			type: 'html',
			dir: 'coverage/'
		}
	});
};