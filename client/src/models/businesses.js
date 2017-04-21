var Businesses = function (url) {
    this.url = url
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
            this.businesses = JSON.parse(jsonString).businesses

            this.businesses.sort(function (a, b) {
                return a.distance - b.distance
            })
            console.log(this.businesses)

            this.done(this.businesses)
        }.bind(this)
        request.send()
    },

    // getBusiness: function (businessName) {
    //     return this.businesses.find(function (business) {
    //         return business.name === businessName
    //     })
    // }

}

module.exports = Businesses