var MapWrapper = function(container, coords, zoom){
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
      animation: google.maps.Animation.DROP
    });
   marker.addListener('click', function() {
    this.openInfoWindow(this, 'hello')
   }.bind(this))

    return marker;
  },

  // addClickEvent: function(){
  //   google.maps.event.addListener(this.googleMap, 'click', function(event){
  //     var position = { lat: event.latLng.lat(), lng: event.latLng.lng() }  
  //     this.addMarker(position);
  //   }.bind(this));
  // },

  addInfoWindow: function(text,marker) {
    // var marker = this.addMarker(coords);
    var infoWindow = new google.maps.InfoWindow({
      content: text
    });
      // infoWindow.open(this.map, marker);
     return infoWindow
  
   }

  
  
  // geoLocate: function(){
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     var center = {lat: position.coords.latitude, lng: position.coords.longitude}; 
  //     this.googleMap.setCenter(center); 
  //     this.addMarker(center);
  //   }.bind(this)); 
  // }
}

module.exports = MapWrapper 