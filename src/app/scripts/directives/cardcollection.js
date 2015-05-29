'use strict';

/**
 * @ngdoc directive
 * @name angularWhistApp.directive:cardCollection
 * @description
 * # card collection
 */
angular.module('angularWhistApp')
    .directive('cardCollection', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/cardcollection.html',
            scope: {
                collection: '=model'
            }
        };
    });
