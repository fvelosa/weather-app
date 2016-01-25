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
		yahooCityTemplate: 'select * from weather.forecast where woeid="<%= woeid %>"',
		yahooPlacesTemplate: 'select woeid, country, placeTypeName, name from geo.places where text="<%= city %>"'
	}
}