'use strict';

function mapCtrl ($scope, $http, GoogleMaps) {
    $scope.map = GoogleMaps.getMap('#map-mini');
}

function contentCtrl($scope, $location, GoogleMaps){
	var map = GoogleMaps.getMap('#map-mini');
	// var lat = 41.0367033;
	// var lng = 27.5112240;
	// $scope.itemPath = $location.$$absUrl + '#/KanolaTarlasi1.jpg/41.0367033/27.5112240';

	// $scope.$on("$routeChangeSuccess", function ($event, current, previous) {
 //    		console.log("smt happened");	
	// 	});

	console.log("I'm in contentCtrl");
}

function routeCtrl($scope, $location, GoogleMaps){
	console.log("I'm in routeCtrl");
}