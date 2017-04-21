var BusinessListView = function (container, mapWrapper) {
    this.container = container  // is the <table id="list">
    this.mapWrapper = mapWrapper
    this.currentlySelected = null
    this.currentlyOpenInfoWindow = null 
}

BusinessListView.prototype.render = function (businesses) {

    while (this.container.hasChildNodes()) {
        this.container.removeChild(this.container.lastChild)
    }

    businesses.forEach(function (business) {
        this.container.appendChild(this.makeTableRow(business))
    }.bind(this))
}

BusinessListView.prototype.makeTableRow = function (business) {
    var tr = document.createElement("tr")

    var nameTd = document.createElement("td")
    nameTd.classList.add("name")
    nameTd.innerHTML = '<p>' + business.details.name + '</p>'
    tr.appendChild(nameTd)

    var priceTd = document.createElement("td")
    priceTd.classList.add("price")
    if (business.details.price) {
        priceTd.innerHTML = '<p class="boxed">' + business.details.price + '</p>'
    }
    tr.appendChild(priceTd)

    var ratingTd = document.createElement("td")
    ratingTd.classList.add("rating")
    ratingTd.innerHTML = '<p class="boxed">' + business.details.rating + '&#8201;&#9733;</p>' // thin space + star
    tr.appendChild(ratingTd)

    var distanceTd = document.createElement("td")
    distanceTd.classList.add("distance")
    distanceTd.innerHTML = '<p>' + this.formatDistance(business.details.distance) + '</p>'
    tr.appendChild(distanceTd)

    tr.onclick = function () {
        this.select(tr, business)  
        this.mapWrapper.googleMap.setCenter(business.coords)
        this.mapWrapper.googleMap.setZoom(16)
    }.bind(this)

    return tr
}

BusinessListView.prototype.formatDistance = function (distance) {
    result = Math.round(distance)
    if (result < 1000) {
        return result + "m"
    } else {
        result /= 1000
        return result.toFixed(1) + "km"
    }
}


BusinessListView.prototype.select = function (li, business) {
    if (this.currentlySelected) {
        this.currentlySelected.classList.remove("selected")
    }
    li.classList.add("selected")
    this.currentlySelected = li
    this.mapWrapper.openInfoWindow(business)
}

module.exports = BusinessListView