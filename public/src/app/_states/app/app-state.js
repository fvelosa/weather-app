/**
 * app-state state
 */
'use strict';

require('./app-state.scss');
require('../../resources/city-resource')

angular.module('app')
	.config(configApp)
	.controller('AppStateController', appController);

function configApp($stateProvider) {
	$stateProvider.state('app', {
		url: '/weather/:woeid',
		views: {
			'': {
				template: require('./app-state.jade'),
				controller: 'AppStateController',
				controllerAs: 'appCtrl'
			}
		}
	});
	
	$stateProvider.state('app-no-woeid', {
		url: '/weather',
		views: {
			'': {
				template: require('./app-state.jade'),
				controller: 'AppStateController',
				controllerAs: 'appCtrl'
			}
		}
	});
}

function appController(cityResource, $stateParams) {
	var vm = this
	
	vm.woeid = $stateParams.woeid || 44418 // London woeid
	
	activate()
	
	function activate() {
		cityResource.woeid = vm.woeid
		cityResource.$fetch().then(function() {
			vm.city = cityResource
		})
	}
}