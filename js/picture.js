Picture = function(pic, map){
	var _ = this;
	var _marker;
	var _lat;
	var _lng;
	var _path;
	var _map;

	this.getMarker = function() { return _marker; };
	this.getLat = function() { return _lat; };
	this.getLng = function() { return _lng; };
	this.getPath = function() { return _path; };
	this.getMap = function() { return _map;};

	this.setMarker = function(marker) {_marker = marker; };
	this.setLat = function(lat) { _lat = lat; };
	this.setLng = function(lng) { _lng = lng; };
	this.setPath = function(path) { _path = path; };
	this.setMap = function(map) { _map = map; };

	var _createMarker = function(){
		var myMarker :new google.maps.Marker({
			position : new google.maps.LatLng( getLat(), getLng() ),
			map : getMap(),
			icon : "/img/markerImg.png"
		});

		google.maps.event.addListener(myMarker, 'click' , function(event){
			window.location("#/" + getPath() );
		});
	}

	var _init = function(){
		setPath(pic.name);
		setLat(pic.loc.lat);
		setLng(pic.loc.lng);
		setMap(map);
	}
}