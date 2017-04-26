var BusinessInfoWindow = require("../views/business_info_window.js")

var Business = function (details, mapWrapper) {
    this.mapWrapper = mapWrapper
    this.coords = { lat: details.coordinates.latitude, lng: details.coordinates.longitude }
    this.details = details
    this.moreDetails = null
    this.infoWindow = new BusinessInfoWindow(this)
    this.marker = mapWrapper.addMarker(this.coords)
    this.marker.addListener("click", function() {
        this.infoWindow.open()
    }.bind(this))
}

module.exports = Business