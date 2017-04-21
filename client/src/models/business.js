var Business = function(details, mapWrapper){
  this.coords = { lat: details.coordinates.latitude, lng: details.coordinates.longitude }
  this.details = details
  this.marker = mapWrapper.addMarker(this.coords)
  this.infoWindow = mapWrapper.addInfoWindow(details.name, this.marker)


}

module.exports = Business