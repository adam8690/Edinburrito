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

      
        var li = document.createElement("li")
        li.innerText = business.details.name + " " + business.details.rating + " " + business.details.price
        this.container.appendChild(li)
        li.onclick = function(){
            this.highlight(li, business)  
            this.mapWrapper.googleMap.setCenter(business.coords)
            this.mapWrapper.googleMap.setZoom(16)
        }.bind(this)
    }.bind(this))

}

BusinessListView.prototype.highlight = function (li, business) {
    if (this.currentlySelected) {
        this.currentlySelected.classList.remove("selected")
    }
    li.classList.add("selected")
    this.currentlySelected = li
    this.mapWrapper.openInfoWindow(business)
}

module.exports = BusinessListView