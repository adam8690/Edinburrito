var Business = require ('./business.js')

var Businesses = function (mapWrapper) {
    this.mapWrapper = mapWrapper 
    this.businesses = []
    this.done = null
}

Businesses.prototype = {

    populate: function () {
        var request = new XMLHttpRequest()
        request.open("GET", "http://localhost:3000/api/burrito/")
        request.onload = function () {
            if (request.status !== 200) return
            var jsonString = request.responseText
            var yelpBusinesses = JSON.parse(jsonString).businesses
            this.businesses = yelpBusinesses.map(function(business){
                return new Business(business, this.mapWrapper)
            }.bind(this))
            this.done(this.businesses)
        }.bind(this)
        request.send()
    }

    // getBusiness: function (businessName) {
    //     return this.businesses.find(function (business) {
    //         return business.name === businessName
    //     })
    // }

}

module.exports = Businesses