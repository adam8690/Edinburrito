var Business = function(details, mapWrapper){
  this.mapWrapper = mapWrapper
  this.coords = { lat: details.coordinates.latitude, lng: details.coordinates.longitude }
  this.details = details
  this.marker = mapWrapper.addMarker(this.coords)
  this.infoWindow = mapWrapper.addInfoWindow(details.name, this.marker)

  this.marker.addListener("click", function() {
    this.mapWrapper.openInfoWindow(this)
  }.bind(this))

}

Business.prototype.openInfoWindow = function () {
  this.infoWindow.open(this.mapWrapper, this.marker)
}

module.exports = Business