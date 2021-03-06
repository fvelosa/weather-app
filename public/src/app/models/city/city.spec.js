'use strict';

describe('Test the city Factory', function () {
	var city, cityFactory, apiSrv, $q, config, $rootScope

	// Creates module for unit tests
	angular.module('app', [])

	beforeEach(function () {
		angular.mock.module('app')

		require('./city')
		require('../../config')

		inject(function ($injector) {
			cityFactory = $injector.get('cityFactory');
			apiSrv = $injector.get('apiSrv');
			$q = $injector.get('$q');
			config = $injector.get('config');
			$rootScope = $injector.get('$rootScope')
		})

		city = cityFactory(144)
	})

	it('should be empty to start with', function () {
		expect(city.woeid).toBe(144);
	});

	it('should call apiSrv with the right string on fetch', function () {
		var defer = $q.defer()

		spyOn(apiSrv, 'get').and.returnValue(defer.promise)

		city.$fetch()

		expect(apiSrv.get.calls.allArgs()[0][0]).toBe(config.yahooPath);
		expect(apiSrv.get.calls.allArgs()[0][1].q).toBe('select * from weather.forecast where woeid="144"');
	});

	it('when $resolve should call apiSrv if not in memory', function () {
		var defer = $q.defer()

		spyOn(apiSrv, 'get').and.returnValue(defer.promise)

		city.$resolve()

		expect(apiSrv.get.calls.allArgs()[0][0]).toBe(config.yahooPath);
		expect(apiSrv.get.calls.allArgs()[0][1].q).toBe('select * from weather.forecast where woeid="144"');

		// Adds query attribute to check it won't test again
		city.description = 'test'

		city.$resolve()

		expect(apiSrv.get.calls.count()).toBe(1)
	});
});