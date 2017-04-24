var MapWrapper = require('./views/mapWrapper.js')
var BusinessListView = require('./views/business_list_view.js')
var Businesses = require('./models/businesses.js')
var map;
var marker;

var initialize = function () {
    var mapDiv = document.getElementById('map')

    var defaultLocation = { lat: 55.953291, lng: -3.200000 } // Edinburgh (George St)
    var mainMap = new MapWrapper(mapDiv, defaultLocation, 15)

 
    var button = document.querySelector('#moist')

    button.onclick = searchAddress

    //     var mapOptions = {
    //         center: new google.maps.LatLng(40.680898,-8.684059),
    //         zoom: 11,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP
    //     };

    //     map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // }


     // google.maps.event.addDomListener(window, 'load', initialize);


    function searchAddress() {

        var addressInput = document.getElementById('address-input').value;

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({address: addressInput}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {

          var myResult = results[0].geometry.location;

          // createMarker(myResult);

          mainMap.googleMap.setCenter(myResult);

          mainMap.googleMap.setZoom(17);

          mainMap.addMyLocationMarker(myResult)


            }
        });

    }

    // function createMarker(latlng) {

    //   if(marker != undefined && marker != ''){
    //     marker.setMap(null);
    //     marker = '';
    //   }

    //   marker = new google.maps.Marker({
    //     map: map,
    //     position: latlng
    //   });
    // }
   
    // mainMap.addMarker()
    // mainMap.addClickEvent()
    // mainMap.addInfoWindow(center, "are we in edinburgh yet?!")




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
