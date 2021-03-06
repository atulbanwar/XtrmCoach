﻿(function () {
	'use strict';
	var app = angular.module('app', ['ngCookies', 'ui.router', 'angularjs-dropdown-multiselect', 'ngMaterial', 'ngMessages']);

	app.config(function ($httpProvider, $stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('home', {
			url: '/home',
			controller: 'homeController',
			templateUrl: 'app/views/home.html'
		})
		.state('signup', {
			url: '/signup',
			controller: 'signupController',
			templateUrl: 'app/views/signup.html'
		})
		.state('dashboard', {
			url: '/dashboard',
			controller: 'dashboardController',
			templateUrl: 'app/views/dashboard.html',
			resolve: {
				"check": function ($state, $rootScope) {
					if (!$rootScope.isLoggedIn) {
						$state.go('home');
					}
				}
			}
		})
		.state('dashboard.analysis', {
			url: '/analysis',
			controller: 'analysisController',
			templateUrl: 'app/views/analysis.html'
		})
		.state('dashboard.sports', {
			url: '/sports',
			controller: 'sportController',
			templateUrl: 'app/views/sports.html',
			reload: true
		})
		.state('dashboard.players', {
			url: '/players',
			controller: 'playerController',
			templateUrl: 'app/views/players.html'
		})
		.state('dashboard.evaluate', {
			url: '/evaluate',
			controller: 'evaluateController',
			templateUrl: 'app/views/evaluate.html'
		});

		$urlRouterProvider.otherwise('home');

		$httpProvider.defaults.headers.common = {};
		$httpProvider.defaults.headers.post = {};
		$httpProvider.defaults.headers.put = {};
		$httpProvider.defaults.headers.patch = {};
	});

	app.run(['$rootScope', '$cookieStore',
	function ($rootScope, $cookieStore) {
		$rootScope.isLoggedIn = $cookieStore.get('isLoggedIn') || false;
		$rootScope.user = $cookieStore.get('user') || {};
	}]);

})();