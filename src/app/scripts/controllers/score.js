'use strict';

/**
 * @ngdoc function
 * @name angularWhistApp.controller:ScoreCtrl
 * @description
 * # ScoreCtrl
 * Controller of the angularWhistApp
 */

// setting angular whist var
var angularWhistApp = angular.module('angularWhistApp');
angularWhistApp.controller('ScoreCtrl', function($scope) {

 	// Retrieve scores via jquery getJSON function
	function getScores(n){
	$.getJSON('http://45.55.254.127:8000/getgames/' + n,function(data){ 
		}).success(function(data){
			$scope.$apply(function(){
				$scope.list = data;
				console.log(data);	
			})
		})
	}
 getScores('all');
});



