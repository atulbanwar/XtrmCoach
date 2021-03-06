﻿(function () {
	'use strict';
	angular.module('app')
	.service('sportService', ['$rootScope', '$http', function ($rootScope, $http) {
		var sportService = this;
		var config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		this.getSports = function (callback) {
			$http.get('http://localhost:65335/api/Sport?userId=' + $rootScope.user.id)
			.success(function (data, status) {
				if (data != null) {
					for (var i = 0; i < data.length; i++) {
						data[i].isEdit = false;
					}
				}

				callback(data, status);
			})
			.error(function (data, status) {
				callback(data, status);
			});
		};

		this.addNewSport = function (sport, callback) {
			$http.post('http://localhost:65335/api/Sport/', sport, config)
			.success(function (status) {
				//callback(true);
				sportService.getSports(callback);
			})
			.error(function (status) {
				callback({}, false);
			});
		};

		this.updateSport = function (sport, callback) {
			$http.put('http://localhost:65335/api/Sport/', sport, config)
			.success(function (response, status) {
				if (status == 200) {
					sportService.getSports(callback);
				} else {
					$scope.error = response;
				}
			})
			.error(function (status) {
				callback({}, false);
			});
		};

		this.deleteSport = function (sportId, callback) {
			$http.delete('http://localhost:65335/api/Sport/' + sportId, config)
			.success(function (response, status) {
				if (status == 200) {
					sportService.getSports(callback);
				} else {
					$scope.error = response;
				}
			})
			.error(function (status) {
				callback({}, false);
			});
		};

		this.getPerfParaNames = function (callback) {
			$http.get('http://localhost:65335/api/PerformanceParameterName/')
			.success(function (data, status) {
				if (status == 200) {
					callback(data, status);
				} else {
					callback('', false);
				}
			})
			.error(function (data, status) {
				callback(data, status);
			});
		};

		this.getPerfParaTypeGroups = function (perfParaNameId, callback) {
			$http.get('http://localhost:65335/api/PerformanceParameterTypeGroup/' + perfParaNameId)
			.success(function (data, status) {
				if (status == 200) {
					callback(data, status);
				} else {
					callback('', false);
				}
			})
			.error(function (data, status) {
				callback(data, status);
			});
		};

		this.getPerfParameters = function (sportId, callback) {
			$http.get('http://localhost:65335/api/PerformanceParameter/' + sportId)
			.success(function (data, status) {
				if (status == 200) {
					if (data != null) {
						for (var i = 0; i < data.length; i++) {
							data[i].isEdit = false;
						}
					}

					callback(data, status);
				} else {
					callback('', false);
				}
			})
			.error(function (data, status) {
				callback(data, status);
			});
		};

		this.addNewPerfParameter = function (perfParameter, callback) {
			$http.post('http://localhost:65335/api/PerformanceParameter/', perfParameter, config)
			.success(function (status) {
				//callback(true);
				sportService.getPerfParameters(perfParameter.sportId, callback);
			})
			.error(function (status) {
				callback({}, false);
			});
		};

		this.updatePerfParameter = function (perfParameter, callback) {
			$http.put('http://localhost:65335/api/PerformanceParameter/', perfParameter, config)
			.success(function (response, status) {
				if (status == 200) {
					sportService.getPerfParameters(perfParameter.sportId, callback);
				} else {
					$scope.error = response;
				}
			})
			.error(function (status) {
				callback({}, false);
			});
		};

		this.deletePerfParameter = function (perfParameterId, callback) {
			$http.delete('http://localhost:65335/api/PerformanceParameter/' + perfParameterId, config)
			.success(function (response, status) {
				callback(response, status);
			})
			.error(function (status) {
				callback({}, false);
			});
		};
	}]);
})();