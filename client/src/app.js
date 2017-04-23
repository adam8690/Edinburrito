var MapWrapper = require('./views/mapWrapper.js')
var BusinessListView = require('./views/business_list_view.js')
var Businesses = require('./models/businesses.js')

var initialize = function () {
    var mapDiv = document.getElementById('map')
    var defaultLocation = { lat: 55.953291, lng: -3.200000 } // Edinburgh (George St)
    var mainMap = new MapWrapper(mapDiv, defaultLocation, 15)

    var whereAmI = document.querySelector('#my-location') //added this initialize function 
    whereAmI.onclick = function () {
        navigator.geolocation.getCurrentPosition(function (position) {
        var currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude }
            mainMap.googleMap.setCenter(currentPosition)
            mainMap.addMyLocationMarker(currentPosition)
            businesses.populate(currentPosition)
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
