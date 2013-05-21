'use strict';

function mapCtrl ($scope, $http, GoogleMaps) {
    $scope.map = GoogleMaps.getMap('#map-mini');
}

function contentCtrl($scope, $location, $http, GoogleMaps){
	$scope.map = GoogleMaps.getMap('#map-mini');
	// load the route
	var myPath =  $location.absUrl() + "Path.gpx";
	getRoute($http, myPath, function(){

	});
	displayRoute($http, $scope.map, myPath);

	$scope.$on("$routeChangeSuccess", function($event, next, current) {
        if(next.params.picturePath){
           GoogleMaps.putPicture( '#map-mini', next.params);
        }else if(next.params.lat){
        	GoogleMaps.putMarker('#map-mini', next.params);
        }

    });
}

function getRoute($http, gpxFilePath, callback){
	$http.get(gpxFilePath).success( function(data){
		callback(data);
	});
}

function displayRoute($http, map, myPath){
	$http.get(myPath).success( function(data){
		var bounds = new google.maps.LatLngBounds();
		var points = [];
		$(data).find("trkpt").each(function(index, value){
			var lat = parseFloat(value.attributes.lat.value);
			var lon = parseFloat(value.attributes.lon.value);
			var p  = new google.maps.LatLng(lat, lon);
			points.push(p);
			bounds.extend(p);
		});

		var polyline = new google.maps.Polyline({
			path: points,
			strokeColor: "#FF00AA",
			strokeOpacity: 0.7,
			strokeWeight: 2
		});

		polyline.setMap(map);
		map.setCenter(points[0]);
		map.fitBounds(bounds);
	});
}