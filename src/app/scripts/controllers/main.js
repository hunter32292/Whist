'use strict';

/**
 * @ngdoc function
 * @name angularWhistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularWhistApp
 */
angular.module('angularWhistApp')
    .controller('MainCtrl', ['$scope', 'whistGame', function ($scope, whistGame) {
        $scope.randomName = chance.name();
        $scope.human = whistGame.players.human;
        $scope.setDefault = function () {
            if(whistGame.players.human.name === '') {
                whistGame.players.human.name = $scope.randomName;
            }
        };
    }]);
