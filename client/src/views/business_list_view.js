var BusinessListView = function (container, mapWrapper) {
    this.container = container
    this.mapWrapper = mapWrapper
    this.currentlySelected = null
}

BusinessListView.prototype.render = function (businesses) {

    while (this.container.hasChildNodes()) {
        this.container.removeChild(this.container.lastChild)
    }

    businesses.forEach(function (business) {
        var coords = { lat: business.coordinates.latitude, lng: business.coordinates.longitude }
        var li = document.createElement("li")
        li.innerText = business.name
        this.container.appendChild(li)
        li.onclick = function(){
            this.highlight(li)
            // li.classList.add('selected')
            this.mapWrapper.googleMap.setCenter(coords)
            this.mapWrapper.googleMap.setZoom(16)
            
        }.bind(this)
        this.mapWrapper.addMarker( coords )
    }.bind(this))

}

BusinessListView.prototype.highlight = function (selected) {
    if (this.currentlySelected) {
        this.currentlySelected.classList.remove("selected")
    }
    selected.classList.add("selected")
    this.currentlySelected = selected
}

module.exports = BusinessListView