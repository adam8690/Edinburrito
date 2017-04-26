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
         directionsService.route({
           origin: origin,
           destination: destination,
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
      icon: '/images/burrito.png' 
    });
    this.markers.push(marker)
    return marker;
  },

  addMyLocationMarker: function (coords) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP,
      icon: '/images/minion.png'
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

  openInfoWindow: function (business) {
    if (this.currentlyOpenInfoWindow) this.currentlyOpenInfoWindow.close()
    // this next line is brutal:
    business.infoWindow.infoWindow.open(business.mapWrapper.googleMap, business.marker)
    this.currentlyOpenInfoWindow = business.infoWindow.infoWindow
  },

    reposition: function(coords) {
        this.removeMarkers()
        this.googleMap.setCenter(coords);
        this.googleMap.setZoom(16);
        this.addMyLocationMarker(coords)
    }

}

module.exports = MapWrapper 