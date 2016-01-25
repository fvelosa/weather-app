/**
 * app-state state
 */
'use strict';

require('./search-state.scss');
require('../../models/places/places')

angular.module('app')
	.config(configApp)
	.controller('SearchStateController', SearchController);

function configApp($stateProvider) {
	$stateProvider.state('search', {
		url: '/search',
		views: {
			'': {
				template: require('./search-state.jade'),
				controller: 'SearchStateController',
				controllerAs: 'searchCtrl'
			}
		}
	});
}

function SearchController(placesFactory, $state, $scope) {
	var vm = this

	vm.query = ''
	vm.places = placesFactory()
	vm.select = select

	function search() {
		if (vm.query) {
			vm.places.$search(vm.query)
		}
	}

	// When variable changes and has more than 3 chars does a query
	$scope.$watch(function () {
		return vm.query
	}, function (value) {
		if (value.length >= 2) {
			search()
		}
	})

	// Goes back to the weather prediction state
	function select(woeid) {
		$state.go('app', {
			woeid: woeid
		})
	}
}