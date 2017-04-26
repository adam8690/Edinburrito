var BusinessInfoWindowContent = require("./business_info_window_content.js")

var BusinessInfoWindow = function (business) {
    this.business = business
    this.content = new BusinessInfoWindowContent(this.business)
    this.infoWindow = new google.maps.InfoWindow()
    this.infoWindow.setContent(this.content.createContentDiv())
}

// just a wrapper so we can say business.infoWindow.open()
// rather than business.infoWindow.infoWindow.open(args)
// it passes through to mapWrapper, which does the actual opening
// since the mapWrapper also handles closing any previously opened InfoWindows
BusinessInfoWindow.prototype.open = function () {
    this.business.mapWrapper.openInfoWindow(this.business)
    this.getMoreDetails(this.content.expandContent.bind(this.content))  // !
}

BusinessInfoWindow.prototype.getMoreDetails = function (callback) {
    if (!this.moreDetails){
        var request = new XMLHttpRequest();
        request.open("GET", "http://localhost:3000/api/businesses/"+ this.business.details.id);
        request.onload = function(){
            if ( request.status !== 200 ) return 
                var jsonString = request.responseText
                var moreDetails = JSON.parse(jsonString)
                callback(moreDetails)
        }
        request.send()
    }
}

module.exports = BusinessInfoWindow