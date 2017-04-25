var Business = require ('./business.js')

var Businesses = function (mapWrapper) {
    this.mapWrapper = mapWrapper 
    this.businesses = []
    this.done = null
}

Businesses.prototype = {
    populate: function (latLng) {
        var request = new XMLHttpRequest()

        // new
        request.open("POST", "http://localhost:3000/api/businesses")
        request.setRequestHeader("Content-Type", "application/json")
        request.onload = function () {
            if (request.status !== 200) return
            var jsonString = request.responseText
            var yelpBusinesses = JSON.parse(jsonString).businesses
            this.businesses = yelpBusinesses.map(function(business) {
                return new Business(business, this.mapWrapper)
            }.bind(this))
            this.done(this.businesses)
        }.bind(this)
        var payload = JSON.stringify({
            term: "burrito",
            locale: "en_GB",
            latitude: latLng.lat,
            longitude: latLng.lng,
            limit: 50
        })
        request.send(payload)
    }
}

module.exports = Businesses