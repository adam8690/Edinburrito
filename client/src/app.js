var MapWrapper = require('./views/mapWrapper.js')
var BusinessListView = require('./views/business_list_view.js')
var Businesses = require('./models/businesses.js')

var initialize = function () {

    var mapDiv = document.getElementById('map')
    var center = { lat: 55.953291, lng: -3.200000 }
    var mainMap = new MapWrapper(mapDiv, center, 15)
    // mainMap.addMarker(center)
    mainMap.addClickEvent()
    mainMap.addInfoWindow(center, "are we in edinburgh yet?!")
    
    // getting the burrito data
    var businesses = new Businesses()
    //setup views
    var list = document.querySelector("#list")
    var businessListView = new BusinessListView(list)
    //set callback for request
    businesses.done = businessListView.render.bind(businessListView)
    //get data from server
    businesses.populate()
}

window.onload = initialize

