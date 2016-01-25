'use strict';

module.exports = transformResponse

/** 
 * Transforms the response form the yahoo server into a simpler object
 */
function transformResponse(res) {
	var result

	if (res.query.results && res.query.results.place) {
		// When search returns only one location the place is an object, not an array
		if (res.query.results.place && !_.isArray(res.query.results.place)) {
			// Creates array with a single object
			res.results.place = [res.query.results.place]
		}

		// Returns only important values to query
		result = _.map(res.query.results.place, function (place) {
			return {
				woeid: place.woeid,
				type: place.placeTypeName.content,
				name: place.name,
				country: place.country.content
			}
		})
	}

	return result
}