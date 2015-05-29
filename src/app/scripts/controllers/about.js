'use strict';

/**
 * @ngdoc function
 * @name angularWhistApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularWhistApp
 */
angular.module('angularWhistApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
