'use strict';

/* Services */
var app = angular.module('google-maps', ['ngResource']);

app.factory('GoogleMaps', function($http) {
    var maps = {};
    var items = [];
    var myOptions; 
    
    function setOptions(){
        var lat     = 41.04207384890103;
        var lng     = 29.0972900390625;
        var zoom    = 11;
        var options = {
            zoom : zoom,
            center : new google.maps.LatLng(lat, lng),
            mapTypeId : google.maps.MapTypeId.ROADMAP
        };
        return options;
    }

    function addMap(mapId) {
        var map = new google.maps.Map($(mapId)[0], myOptions);
        maps[mapId] = map;
    }

    function getMap(mapId) {
        if (!maps[mapId]) addMap(mapId);
        return maps[mapId];
    }

    myOptions = setOptions();

    return {
        addMap: addMap,
        getMap: getMap
    }
});
