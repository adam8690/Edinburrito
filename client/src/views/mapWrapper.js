var BusinessDetailView = require('./business_detail_view.js');

var MapWrapper = function(container, coords, zoom){
  this.currentlyOpenInfoWindow = null
  this.markers = []
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
  this.directionsDisplay = new google.maps.DirectionsRenderer;
  this.directionsService = new google.maps.DirectionsService;
  this.directionsDisplay.setMap(this.googleMap);
}

MapWrapper.prototype = {

  calculateAndDisplayRoute: function(directionsService, directionsDisplay,origin, destination, selectedMode) {
         // var selectedMode = document.getElementById('#mode').value;
         directionsService.route({
           origin: origin,  // Haight.
           destination: destination,  // Ocean Beach.
           travelMode: google.maps.TravelMode[selectedMode]
         }, function(response, status) {
           if (status == 'OK') {
             directionsDisplay.setDirections(response);
           } // no route will be shown if no available results (ZERO_RESULTS etc)
         });
       },

  addMarker: function (coords) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP,
      icon: '/images/267881.png' 
    });
    this.markers.push(marker)
    return marker;
  },

  addMyLocationMarker: function (coords) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP,
      icon: '/images/Daveault1.png'
    })
    this.markers.push(marker)
    return marker
  },

   removeMarkers: function(){
      for(i=0; i< this.markers.length; i++){
          this.markers[i].setMap(null);
      }
  },

  addClickEvent: function(){
    google.maps.event.addListener(this.googleMap, 'click', function(event){
      var position = { lat: event.latLng.lat(), lng: event.latLng.lng() }  
      this.addMarker(position);
    }.bind(this));
  },


  addInfoWindow: function(business, marker) {
    // var marker = this.addMarker(coords);
    detailsView = new BusinessDetailView(business);
    content = detailsView.createDetailView()    

    var infoWindow = new google.maps.InfoWindow();
    infoWindow.setContent(content);
      // infoWindow.open(this.map, marker);
     return infoWindow
   },

   openInfoWindow: function (business) {
     if (this.currentlyOpenInfoWindow) this.currentlyOpenInfoWindow.close()
     business.openInfoWindow()
     this.currentlyOpenInfoWindow = business.infoWindow
    },

    reposition: function(coords) {
        this.removeMarkers()
        this.googleMap.setCenter(coords);
        this.googleMap.setZoom(16);
        this.addMyLocationMarker(coords)
        this.myMove() //added for animation  
    }

}

module.exports = MapWrapper 