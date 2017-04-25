var MapWrapper = require('./views/mapWrapper.js')
var BusinessListView = require('./views/business_list_view.js')
var Businesses = require('./models/businesses.js')
var map
var marker

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
    var credits = document.querySelector("#credits-text")
    credits.onclick = showCredits

    var search = document.querySelector('#location')
    search.onkeydown = function (e) {
        if (e.keyCode === 13) {        // 13 = Enter
            searchAddress(this.value)
        }
    }

    function redraw(coords) {
        businessListView.currentLocation = coords
        mainMap.reposition(coords)
        businesses.populate(coords)
    }

    function searchAddress(searchString) {
        var geocoder = new google.maps.Geocoder()
        geocoder.geocode({ address: searchString }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var coords = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                }
                redraw(coords)
            }
        })
    }

    var whereAmI = document.querySelector('#my-location')
    whereAmI.onclick = function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            var coords = {
                lat: position.coords.latitude,
                lng: position.coords.longitude }
            redraw(coords)
        })
    }

    var businesses = new Businesses(mainMap)    // getting the burrito data
    var list = document.querySelector("#list")  // setup views
    var businessListView = new BusinessListView(list, mainMap)
    businesses.done = businessListView.render.bind(businessListView)  //set callback for request
    businesses.populate(defaultLocation)        // get data from server
}

window.onload = initialize
