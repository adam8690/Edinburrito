var MapWrapper = require('./views/mapWrapper.js')
var BusinessListView = require('./views/business_list_view.js')
var Businesses = require('./models/businesses.js')
var map;
var marker;

var initialize = function () {
    var mapDiv = document.querySelector("#map")
    var defaultLocation = { lat: 55.953291, lng: -3.200000 } // Edinburgh (George St)
    var mainMap = new MapWrapper(mapDiv, defaultLocation, 15)
    var body = document.querySelector("body")
    var calculateAndDisplayRoute = document.querySelector('#floating-panel')
    
    var showCredits = function () {
        flexGrid.style.opacity = 0.3
        creditsPopup.style.display = "block"
        credits.onclick = hideCredits
        body.onmouseup = hideCredits // a click anywhere will hide the popup
    }

    var hideCredits = function () {
        flexGrid.style.opacity = 1
        creditsPopup.style.display = "none"
        credits.onclick = showCredits
        body.onmouseup = null
    }

    var flexGrid = document.querySelector(".flex-grid")
    var creditsPopup = document.querySelector("#credits-popup")
    creditsPopup.onclick = hideCredits
    var credits = document.querySelector("#credits")
    credits.onclick = showCredits

<<<<<<< HEAD
=======
   


>>>>>>> 2a5411ca95bdddbc72e19edb911ffd927d523164
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
