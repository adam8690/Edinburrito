var BusinessListView = function (container, mapWrapper) {
    this.container = container
    this.mapWrapper = mapWrapper
    this.currentlySelected = null
    this.currentlyOpenInfoWindow = null 
}

BusinessListView.prototype.render = function (businesses) {

    while (this.container.hasChildNodes()) {
        this.container.removeChild(this.container.lastChild)
    }

    businesses.forEach(function (business) {
        // var coords = { lat: business.coordinates.latitude, lng: business.coordinates.longitude }
        var li = document.createElement("li")
        li.innerText = business.details.name
        this.container.appendChild(li)
        // var marker = this.mapWrapper.addMarker( coords )
        // var infoWindow = this.addInfoWindow(marker, business)
        li.onclick = function(){
            this.highlight(li, marker, business)  
            // li.classList.add('selected')
            this.mapWrapper.googleMap.setCenter(business.coords)
            this.mapWrapper.googleMap.setZoom(16)
            
        }.bind(this)
      

    }.bind(this))

}

BusinessListView.prototype.highlight = function (selected) {
    if (this.currentlySelected) {
        this.currentlySelected.classList.remove("selected")
    }
    selected.classList.add("selected")
    this.currentlySelected = selected
    if(this.currentlyOpenInfoWindow){
        this.currentlyOpenInfoWindow.close()
    }
    // this.currentlyOpenInfoWindow = this.mapWrapper.openInfoWindow(marker, business.name)
}

module.exports = BusinessListView