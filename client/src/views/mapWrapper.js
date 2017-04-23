
var MapWrapper = function(container, coords, zoom){
  this.currentlyOpenInfoWindow = null
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
}


MapWrapper.prototype = {

  
  addMarker: function(coords){
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP,
      icon: 'http://localhost:3000/images/267881.png'      
    });

    return marker;
  },

  addMyLocationMarker: function(coords){
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP,
      icon: 'http://localhost:3000/images/Daveault1.png'
    })
    return marker
  },

  addClickEvent: function(){
    google.maps.event.addListener(this.googleMap, 'click', function(event){
      var position = { lat: event.latLng.lat(), lng: event.latLng.lng() }  
      this.addMarker(position);
    }.bind(this));
  },

  addInfoWindow: function(text,marker) {
    var infoWindow = new google.maps.InfoWindow({
      content: text
    });
     return infoWindow
   },

   openInfoWindow: function (business) {
     if (this.currentlyOpenInfoWindow) this.currentlyOpenInfoWindow.close()
     business.openInfoWindow()
     this.currentlyOpenInfoWindow = business.infoWindow
    },

}

module.exports = MapWrapper 