'use strict';

/**
 * @ngdoc service
 * @name angularWhistApp.whistShark
 * @description
 * # whistShark
 * strategic whist-playing service in the angularWhistApp.
 */
angular.module('angularWhistApp')
    .service('whistShark', function () {
        // AngularJS will instantiate a singleton by calling "new" on this function
        this.chooseCard = function (player, game) {
            // TODO choose a card intentionally
            var choices = player.availableCardsInSuit(game.trick.suit);
            if(choices.length === 0) {
                choices = player.availableCards();
            }
            return chance.pick(choices);
        };
    });
