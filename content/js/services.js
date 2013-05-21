'use strict';

/* Services */
var app = angular.module('google-maps', ['ngResource']);

app.factory('GoogleMaps', function($http) {
    var maps = {};
    var items = [];
    var myOptions; 
    var curInfoWindow;
    
    function setOptions(options){
        var lat = 41.04207384890103;
        var lng = lng = 29.0972900390625;
        var zoom = 11;
        if(options){
            if(options.lat) lat = options.lat;
            if(options.lng) lng = options.lng;
            if(options.zoom) zoom = options.zoom;
        }

        var options = {
            zoom : zoom,
            center : new google.maps.LatLng(lat, lng),
            mapTypeId : google.maps.MapTypeId.ROADMAP
        };
        return options;
    }

    function addMap(mapId, options) {
        myOptions = setOptions(options);
        var map = new google.maps.Map($(mapId)[0], myOptions);
        maps[mapId] = map;
    }

    function getMap(mapId, options) {
        if (!maps[mapId]) addMap(mapId);
        return maps[mapId];
    }

    function putMarker(mapId, params){
        var loc = new google.maps.LatLng(params.lat, params.lng);
        var marker = new google.maps.Marker( 
        {
            position: loc,
            map: getMap(mapId)
        });     
    }

    function putPicture(mapId, params ){
        if(curInfoWindow) curInfoWindow.setMap(null);
        var loc = new google.maps.LatLng(params.lat, params.lng);
        // setCenter(mapId,loc);
        var marker = new google.maps.Marker( 
        {
            position: loc,
            map: getMap(mapId),
            title: params.picturePath
        });

        var infowindow = new google.maps.InfoWindow({
           content: '<img style="height: 150px;" src="' + params.picturePath +'" alt="" />',
           maxWidth: 1 
        });
        var clickevent = google.maps.event.addListener(marker, 'click', function(){
            infowindow.open(getMap(mapId), marker);
        });
        infowindow.open(getMap(mapId), marker);

        curInfoWindow = infowindow; 
    }



    function setCenter(mapId, center){
        var map = getMap(mapId);
        map.setCenter( center);
    }

    return {
        addMap: addMap,
        getMap: getMap,
        putPicture: putPicture,
        putMarker: putMarker
    }
});
