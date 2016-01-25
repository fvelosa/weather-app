'use strict';

describe('api-srv tests =>', function () {

	var api, $httpBackend, $q, config, $rootScope

	// Creates module for unit tests
	angular.module('app', [])

	// Requires config module to get config variable
	require('../config')
	require('./api-srv')

	beforeEach(function () {
		angular.mock.module('app')

		inject(function ($injector) {
			api = $injector.get('apiSrv')
			config = $injector.get('config')
			$httpBackend = $injector.get('$httpBackend')
			$q = $injector.get('$q')
			$rootScope = $injector.get('$rootScope')
		})
	});

	it('on success return data', function () {
		$httpBackend.whenGET(config.yahooUrl + config.yahooPath)
			.respond({
				data: {
					description: 'test'
				}
			})

		var req = api.get(config.yahooPath)
		var data

		req.then(function (response) {
			data = response
		})

		$httpBackend.flush()
		$rootScope.$apply()

		expect(data.data.description).toBe('test')
	})

	it('on 200 ok with error returns error', function () {
		$httpBackend.whenGET(config.yahooUrl + config.yahooPath)
			.respond({
				error: {
					description: 'error'
				}
			})

		var req = api.get(config.yahooPath)
		var data

		req.then(angular.noop, function (response) {
			data = response
		})

		$httpBackend.flush()
		$rootScope.$apply()

		expect(data).toBe('error')
	})

	it('on http error rejects response', function () {
		$httpBackend.whenGET(config.yahooUrl + config.yahooPath)
			.respond(400, {
				error: {
					description: 'error'
				}
			})

		var req = api.get(config.yahooPath)
		var data

		req.then(angular.noop, function (response) {
			data = response
		})

		$httpBackend.flush()
		$rootScope.$apply()

		expect(data).toBe('error')

	})

	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});
})