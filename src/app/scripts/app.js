'use strict';

/**
 * @ngdoc overview
 * @name angularWhistApp
 * @description
 * # angularWhistApp
 *
 * Main module of the application.
 */
angular
  .module('angularWhistApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
	'ngDialog',
	'ngAnimate'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/game', {
        templateUrl: 'views/gameboard.html',
        controller: 'GameCtrl'
      })
	 .when('/score', {
        templateUrl: 'views/score.html',
        controller: 'ScoreCtrl'
      })
	  .otherwise({
		redirectTo: '/'
            });
    });
