var BusinessInfoWindowContent = require("./business_info_window_content.js")

var BusinessInfoWindow = function (business) {
    this.business = business
    var content = new BusinessInfoWindowContent(this.business)
    this.infoWindow = new google.maps.InfoWindow()
    this.infoWindow.setContent(content.createContentDiv())
}

// just a wrapper so we can say business.infoWindow.open()
// rather than business.infoWindow.infoWindow.open(args)
BusinessInfoWindow.prototype.open = function () {
    this.infoWindow.open(this.business.mapWrapper.googleMap, this.business.marker)
}

module.exports = BusinessInfoWindow