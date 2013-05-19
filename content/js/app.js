'use strict';

/* App Module */

angular.module('ya', ['google-maps']).
    config(['$routeProvider', function($routeProvider) {
    	$routeProvider.
	        when('/', {templateUrl: 'index.html',   controller: mapCtrl}).
	        when('/:picturePath/:lat/:lng'). //
	        otherwise({redirectTo: '/'});   
	}]).run( function($rootScope, $location) {

    // register listener to watch route changes
    $rootScope.$on( "$routeChangeSuccess", function($event, next, current) {
      	console.log("routeChangeSuccess");         
    });
})