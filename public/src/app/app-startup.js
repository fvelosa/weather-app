'use strict';

angular.module('app')
	.config(appConfig)
	.run(appRun);

function appConfig($urlRouterProvider, config, $httpProvider, $locationProvider) {

	// you can put it in if statement or something
	$locationProvider.html5Mode(false);

	// 404 hanler
	$urlRouterProvider.when('', '/');
	$urlRouterProvider.otherwise(function ($injector) {

		$injector.invoke(function ($state) {
			$state.go('error', {
				location: false,
				notify: false,
				reload: false
			});
		});
	});
}

function appRun(/*$rootScope*/) {

	/**
	 * in case you need it
	 */
	//	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
	//	    pr('state change start', toState.name, arguments);
	//	})
	//	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
	//	    pr('state change success', toState.name, arguments);
	//	})
	//	$rootScope.$on('$stateNotFound', function(event, toState, toParams, fromState, fromParams){
	//	    pr('state not found', toState.name, arguments);
	//	})
	//	
	//	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams){
	//	    pr('state change error', arguments);
	//	})
}