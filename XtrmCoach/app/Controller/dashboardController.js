﻿(function () {
	'use strict';
	angular
		.module('app')
		.controller('dashboardController', dashboardController);

	function dashboardController($scope, $location, $rootScope, $cookieStore) {
		$scope.logout = function () {
			$rootScope.isLoggedIn = false;
			$rootScope.user = {};
			$cookieStore.remove('isLoggedIn');
			$cookieStore.remove('user');

			$location.path('/');
		};
	}
})();