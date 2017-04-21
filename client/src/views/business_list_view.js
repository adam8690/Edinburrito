var BusinessListView = function (container, mapWrapper) {
    this.container = container
    this.mapWrapper = mapWrapper
}

BusinessListView.prototype.render = function (businesses) {

    while (this.container.hasChildNodes()) {
        this.container.removeChild(this.container.lastChild)
    }

    businesses.forEach(function (business) {
        var li = document.createElement("li")
        li.innerText = business.name
        this.container.appendChild(li)

        this.mapWrapper.addMarker( { lat: business.coordinates.latitude, lng: business.coordinates.longitude })
    }.bind(this))

}

module.exports = BusinessListView