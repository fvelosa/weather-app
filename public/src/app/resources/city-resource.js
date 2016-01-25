/**
 * Single definition of a City for all app, in the future should 
 * be upgraded to a cityCollection and support several cities
 */
'use strict';

require('../models/city/city')

angular.module('app')
    .factory('cityResource', function (cityFactory) {

        var city = cityFactory()

        return city
    })
