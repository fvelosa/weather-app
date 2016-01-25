'use strict';

require('../../services/api-srv')
require('../../config')

//var _ = require('lodash')

var transformResponse = require('./city-helper.js')

angular.module('app')
	.factory('cityFactory', cityFactory)

/**
 * Factory that abstracts city creation
 */
function cityFactory($q, apiSrv, config) {

	/* Definition of city object */
	function City(woeid) {
		this.woeid = woeid || 44418 // London woeid
	}

	// Uses similiar api syntax has restmod
	
	// Only loads data from server if not in cache
	City.prototype.$resolve = function () {
		var self = this

		// Check if has content
		if (self.description) {
			return $q.when(self)
		} else {
			return this.$fetch().then(function () {
				return self
			})
		}
	}

	// Loads data from server
	City.prototype.$fetch = function () {
		var self = this
		
		// Creates the query using template
		var query = _.template(config.yahooCityTemplate)({
			woeid: this.woeid
		})

		var req = apiSrv.get(config.yahooPath, {
			q: query,
			format: 'json'
		}).then(function (response) {
			angular.extend(self, transformResponse(response))
		})
		
		return req
	}

	return function (woeid) {
		return new City(woeid)
	}
}