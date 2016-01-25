'use strict';

module.exports = transformResponse

/** 
 * Transforms the response form the yahoo server into a simpler object 
 */
function transformResponse(res) {
	var weather = {}
	
	weather.description = res.query.results.channel.description
	weather.location = res.query.results.channel.location
	weather.condition = res.query.results.channel.item.condition
	weather.forecast = res.query.results.channel.item.forecast
	
	return weather
}