'use strict';

function mapCtrl ($scope, $http, GoogleMaps) {
    $scope.map = GoogleMaps.getMap('#map-mini');
}

function contentCtrl($scope, $location, $http, GoogleMaps){
	$scope.map = GoogleMaps.getMap('#map-mini');
	$scope.picList = [];
	// load the route
	var routePath =  $location.absUrl() + "PathJson.json";
	var picListPath = $location.absUrl() + "ImageList.json";

	// display the route
	$http.get(routePath).success( function(data){
		$scope.routeList = data;
		displayRoute($scope.map, data);
	});

	//display the marker images
	$http.get(picListPath).success( function(data){
		$scope.imageList = data;
		$scope.currentImageIndex = 0;
		$scope.currentImage = $scope.imageList[0].name;
		$(data).each(function(index, value){
			$scope.picList.push( new Picture(value, GoogleMaps.getMap("#map-mini") ) );
			// GoogleMaps.putMarker("#map-mini", value); 
		});
	});

	$scope.$on("$routeChangeSuccess", function($event, next, current) {
        if(next.params.picturePath){
           // GoogleMaps.putPicture( '#map-mini', next.params);
        }else if(next.params.lat){
        	// GoogleMaps.putMarker('#map-mini', next.params);
        }
    });

    $scope.prev = function(){
    	console.log("prev");
    	if($scope.currentImageIndex == 0){
    		$scope.currentImageIndex = $scope.imageList.length -1;
    	}else{
    		$scope.currentImageIndex--;
    	}
    	$("#curImage").attr("src", $scope.imageList[$scope.currentImageIndex].name);
    	var newHref = "#/" + $scope.imageList[$scope.currentImageIndex].name + "/"
    					+ $scope.imageList[$scope.currentImageIndex].loc.lat + "/"
    					+ $scope.imageList[$scope.currentImageIndex].loc.lng;
    	$("#imageRef").attr("href", newHref );
    }

    $scope.next = function(){
    	console.log("next");
    	if($scope.currentImageIndex == ($scope.imageList.length -1)) {
    		$scope.currentImageIndex = 0;
    	}else{
    		$scope.currentImageIndex++;
    	}
    	$("#curImage").attr("src", $scope.imageList[$scope.currentImageIndex].name);
    	var newHref = "#/" + $scope.imageList[$scope.currentImageIndex].name + "/"
    					+ $scope.imageList[$scope.currentImageIndex].loc.lat + "/"
    					+ $scope.imageList[$scope.currentImageIndex].loc.lng;
    	$("#imageRef").attr("href", newHref );
    }

    $('#chevron-left').mouseover(function(){
    	$('#chevron-left').css({"border": "solid 1px gray"});
    })
    $('#chevron-left').mouseout(function(){
    	$('#chevron-left').css({"border": ""});
    })
    $('#chevron-right').mouseover(function(){
    	$('#chevron-right').css({"border": "solid 1px gray"});
    })
    $('#chevron-right').mouseout(function(){
    	$('#chevron-right').css({"border": ""});
    })
}

function displayRoute(map, data){
		var bounds = new google.maps.LatLngBounds();
		var points = [];
		$(data).each(function(index, value){
			var p  = new google.maps.LatLng(value.jb, value.kb);
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
}

function displayRouteFromGPX($http, map, myPath){
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