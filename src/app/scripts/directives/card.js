'use strict';

/**
 * @ngdoc directive
 * @name angularWhistApp.directive:card
 * @description
 * # playing card
 */
angular.module('angularWhistApp')
    .directive('card', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/card.html',
            scope: {
                card: '=model'
            }
        };
    });
