/**
 * Main module
 */

angular.module('app',[
    'ngAnimate',
    'ngSanitize',
    'angularModals',
    'cgBusy',
    'angular-loading-bar',
    'ui.bootstrap',
    'ui.router'
]);

module.exports = 'app';

require('./config.js');
require('./app-startup.js');
require('./services/api-srv.js');
require('./_states/app/app-state.js');
require('./_states/error/error-state.js');
require('./_states/index/index-state.js');

require('./directives/weather-background-directive.js');
require('./directives/weather-icon-directive.js');
require('./resources/city-resource.js');