var MapWrapper = require('./views/mapWrapper.js')

var initialize = function(){

var mapDiv = document.getElementById('map');
var center = {lat:55.953291, lng:-3.200000}
var mainMap = new MapWrapper(mapDiv, center, 10);
// mainMap.addMarker(center);
mainMap.addClickEvent();
mainMap.addInfoWindow(center, "are we in edinburgh yet?!");

}

window.onload = initialize;