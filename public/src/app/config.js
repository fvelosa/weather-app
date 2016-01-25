'use strict';

angular.module('app')
	.constant('config', (systemConfig()))

function systemConfig() {

	// create your config here
	return {
		baseCity: 'london',
		yahooUrl: 'https://query.yahooapis.com',
		yahooPath: '/v1/public/yql',
		// _lodash style template for query
		yahooQueryTemplate: 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="<%= city %>")'
	};
}