var MapWrapper = require('./views/mapWrapper.js')
var BusinessListView = require('./views/business_list_view.js')
var ModeSelectView = require('./views/mode_select_view.js')
var Businesses = require('./models/businesses.js')
var map;
var marker;

var initialize = function () {

    var mapDiv = document.getElementById('map')
    var defaultLocation = { lat: 55.953291, lng: -3.200000 } // Edinburgh (George St)
    var mainMap = new MapWrapper(mapDiv, defaultLocation, 15)
    var calculateAndDisplayRoute = document.querySelector('#floating-panel')

    //var modeSelectView = new ModeSelectView(document.querySelector('#mode'));
    var modeSelectView = document.querySelector('#mode')
    console.log(modeSelectView) 
    modeSelectView.onchange =  function () {
        mainMap.calculateAndDisplayRoute(mainMap.directionsService, mainMap.directionsDisplay, modeSelectView.value);
    }


    var search = document.querySelector('#location')
    search.onkeydown = function (e) {
        if (e.keyCode === 13) {        // 13 = Enter
            searchAddress(this.value)
        }
    }



    function reposition(coords) {
        mainMap.removeMarkers()
        mainMap.googleMap.setCenter(coords);
        mainMap.googleMap.setZoom(16);
        mainMap.addMyLocationMarker(coords)
        businesses.populate(coords)
    }

    function searchAddress(searchString) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: searchString }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var coords = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                }
                reposition(coords)
            }
        })
    }

    // function initMap() {
    //         var directionsDisplay = new google.maps.DirectionsRenderer;
    //         var directionsService = new google.maps.DirectionsService;
    //         var map = new google.maps.Map(document.getElementById(mapDiv), {
    //           zoom: 14,
    //           center: coords
    //         });
    //         directionsDisplay.setMap(map);

    //         calculateAndDisplayRoute(directionsService, directionsDisplay);
    //         document.getElementById('#mode').addEventListener('change', function() {
    //           calculateAndDisplayRoute(directionsService, directionsDisplay);
    //         });
    //       }

   



    var whereAmI = document.querySelector('#my-location') //added this initialize function 
    whereAmI.onclick = function () {
        navigator.geolocation.getCurrentPosition(function (position) {
        var coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude }
            businessListView.currentLocation = coords
            reposition(coords)

        })
    }

    // getting the burrito data
    var businesses = new Businesses(mainMap)
    //setup views
    var list = document.querySelector("#list")
    var businessListView = new BusinessListView(list, mainMap)
    //set callback for request
    businesses.done = businessListView.render.bind(businessListView)
    //get data from server
    businesses.populate(defaultLocation)
}

window.onload = initialize
