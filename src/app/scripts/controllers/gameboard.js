'use strict';

/**
 * @ngdoc function
 * @name angularWhistApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the angularWhistApp
 */
angular.module('angularWhistApp')
    .controller('GameCtrl', ['$scope', '$http', 'whistGame', function ($scope, $http, whistGame) {
        $scope.game = whistGame;

        // set player name for testing
        // if we get here from MainCtrl, name will already be set
        if(whistGame.players.human.name === '') {
            whistGame.players.human.name = 'human player';
        }
		/*
		data = [
			{"name":whistGame.human.name,
				"score":whistGame.human.tricks.length}
			,{"name":whistGame.computer.name,
				"score":whistGame.computer.tricks.length}];
		*/
        function chunk (piles) {
            return [piles.slice(0,4),
                    piles.slice(4,8)];
        }
        $scope.$watch('game.players.human.piles', function (piles) {
            $scope.humanPileChunks = chunk(piles);
        });
        $scope.$watch('game.players.computer.piles', function (piles) {
            $scope.computerPileChunks = chunk(piles);
        });
		// TODO: submit scores to the python server, pull information from whistGame
		/*
		data = [];	
		$http.post('http://45.55.254.127:8000', data).
 		 success(function(data, status, headers, config) {
 			console.log("we did it"); 
		}).
 		 error(function(data, status, headers, config) {
 	 		console.log("we didn't do it");
		});	
		*/
    }]);
