var Business = function(details, mapWrapper){
  this.mapWrapper = mapWrapper
  this.coords = { lat: details.coordinates.latitude, lng: details.coordinates.longitude }
  this.details = details
  this.moreDetails = null;
  this.marker = mapWrapper.addMarker(this.coords)
  this.infoWindow = mapWrapper.addInfoWindow(this, this.marker)
  this.marker.addListener("click", function() {
  this.mapWrapper.openInfoWindow(this)
  }.bind(this))

}

Business.prototype.openInfoWindow = function () {
  this.infoWindow.open(this.mapWrapper, this.marker)
},


Business.prototype.getMoreDetails = function (callback) {
    if (!this.moreDetails){
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/api/businesses/"+ this.details.id);
    request.onload = function(){
        if ( request.status !== 200 ) return 
            var jsonString = request.responseText
            var businessDetails = JSON.parse(jsonString)
            this.moreDetails = businessDetails;
            callback()
    }.bind(this)
    request.send()
  }
}

module.exports = Business