'use strict';

angular.module('app')
	.factory('apiSrv', function ($http, $q, config) {

		/**
		 * success callback, return data or error
		 */
		function success(response) {
			// Yahoo errors send 200 Ok with a error object
			if (response.data.error) {
				return $q.reject(response.data.error.description);
			} else {
				return response.data;
			}
		}

		/**
		 * error callback
		 */
		function error(res) {
			return $q.reject(res.data.error.description);
		}

		return {
			get: function (url, params) {

				return $http.get(config.yahooUrl + url, {
					params: params
				}).then(success, error);
			}
		};
	});