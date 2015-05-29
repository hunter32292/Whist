'use strict';

/**
 * @ngdoc function
 * @name angularWhistApp.controller:CardCtrl
 * @description
 * # CardCtrl
 * Controller of the angularWhistApp
 */
angular.module('angularWhistApp')
    .controller('CardCtrl', ['$scope', 'whistGame', function ($scope, whistGame) {
        var active = function(card) {
            var result = true;
            if(whistGame.declarer === null ||
               card.isFaceDown() ||
               card.played ||
               card.owner !== whistGame.currentPlayer ||
               whistGame.trick.suit !== null &&
               whistGame.trick.suit !== card.getSuit() &&
               card.owner.canPlayInSuit(whistGame.trick.suit)) {
                result = false;
            }
            if(result) {
                result = 'active';
            } else {
                result = '';
            }
            return result;
        };

        $scope.playCard = function(card) {
            if(active(card)) {
                whistGame.playCard(card);
            }
        };
        $scope.active = active;
  }]);
