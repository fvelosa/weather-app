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
		url: '',
		abstract: true,
		views: {
			'': {
				template: require('./app-state.jade'),
				controller: 'AppStateController',
				controllerAs: 'appCtrl'
			}
		}
	});
}

function appController(cityResource) {
	var vm = this
	
	vm.city = cityResource
	activate()
	
	function activate() {
		vm.city.$fetch()
	}
}