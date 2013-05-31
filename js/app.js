'use strict';

/* App Module */

var ya = angular.module('ya', ['google-maps']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.
	        when('/:picturePath/:lat/:lng').
	        when('/:lat/:lng');
	}]);