/**
 * @ngdoc directive
 * @name weatherBackground
 * @restrict A
 * @description
 *
 */
angular.module('app')

    .directive('weather', function () {
        return {
            restrict: 'E',
			scope: {
				city: '='
			},
			template: require('./weather-directive.jade')
        };
    });