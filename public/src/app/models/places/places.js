'use strict';

require('../../services/api-srv')
require('../../config')

var transformResponse = require('./places-helper.js')

angular.module('app')
	.factory('placesFactory', placesFactory)

/**
 * Factory that abstracts places creation
 */
function placesFactory($q, apiSrv, config) {

	/* Definition of city object */
	function Places() {
		this.contents = []
	}

	// Search for a city a fills the contents array
	Places.prototype.$search = function (text) {
		var self = this
		
		// Creates the query using template
		var query = _.template(config.yahooPlacesTemplate)({
			city: text
		})
		
		var req = apiSrv.get(config.yahooPath, {
			q: query,
			format: 'json'
		}).then(function (response) {
			self.contents = transformResponse(response)
		})
		
		return req
	}

	return function () {
		return new Places()
	}
}