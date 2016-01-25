'use strict';

require('../../services/api-srv')
require('../../config')

var transformResponse = require('./city-helper.js')

angular.module('app')
	.factory('cityFactory', cityFactory)

/**
 * Factory that abstracts city creation
 */
function cityFactory($q, apiSrv, config) {

	/* Definition of city object */
	function City(name) {
		this.name = name
	}

	// Uses similiar api syntax has restmod but it is not needed for smal project

	// Only loads data from server if not in cache
	City.prototype.$resolve = function () {
		var self = this

		if (this.query) {
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
		var query = _.template(config.yahooQueryTemplate)({
			city: this.name
		})

		var req = apiSrv.get(config.yahooPath, {
			q: query,
			format: 'json'
		}).then(function (response) {
			angular.extend(self, transformResponse(response))
		})
		
		return req
	}

	return function (name) {
		return new City(name)
	}
}