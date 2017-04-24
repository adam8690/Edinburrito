var Utils = require('../models/utils');
var utils = new Utils();

var BusinessListView = function (container, mapWrapper) {
    this.container = container  // is the <table id="list">
    this.mapWrapper = mapWrapper
    this.currentlySelected = null
    this.currentSort = "distance"  // initial setting
    this.currentlyOpenInfoWindow = null
    this.currentlyOpenTextArea = null
    this.notes = JSON.parse(localStorage.getItem("edinburrito")) || {}
}

BusinessListView.prototype.highlightCurrentSort = function (sorts) {
    for (var sort of sorts) {
        if (sort.id === this.currentSort) {
            if (!sort.classList.contains("selected-sort")) {
                sort.classList.add("selected-sort")
            }
        } else {
            if (sort.classList.contains("selected-sort")) {
                sort.classList.remove("selected-sort")
            }
        }
    }
}

BusinessListView.prototype.render = function (businesses) {
    var sorts = document.querySelectorAll(".sort")
    this.highlightCurrentSort(sorts)

    var blw = this
    for (var sort of sorts) {
        sort.addEventListener("click", function () {
            blw.currentSort = this.id
            blw.highlightCurrentSort(sorts)
            blw.buildTable(blw.sortedBy(businessRows, this.id))
        })
    }

    // make an array of objects with the business details and the
    // complete <tr> for displaying it
    businessRows = businesses.map(function (business) {
        return {
            details: business.details,
            row: this.makeTableRow(business),
        }
    }.bind(this))

    businessRows = this.sortedBy(businessRows, this.currentSort)
    this.buildTable(businessRows)
}

BusinessListView.prototype.buildTable = function (businessRows) {
    var th = document.querySelector("th")

    while (this.container.hasChildNodes()) {
        this.container.removeChild(this.container.lastChild)
    }

    businessRows.forEach(function (businessRow) {
        this.container.appendChild(businessRow.row)
    }.bind(this))
}

BusinessListView.prototype.sortedBy = function (rows, key) {
        // returns a new array
        switch (key) {
            case "name":
                return rows.sort(function (a, b) {
                    if (a.details.name < b.details.name) return -1;
                    else if (a.details.name > b.details.name) return 1;
                    else return 0;
                })
                break;
            case "price":
                return rows.sort(function (a, b) {
                    var aPrice = a.details.price || "a long string"
                    var bPrice = b.details.price || "a long string"
                    return aPrice.length - bPrice.length
                })
                break;
            case "rating":
                return rows.sort(function (a, b) {
                    return parseFloat(b.details.rating) - parseFloat(a.details.rating)
                })
                break;
            case "distance":
                return rows.sort(function (a, b) {
                    return a.details.distance - b.details.distance
                })
                break;
            default:  // in case some other search key is entered
                return rows
        }
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
    distanceTd.innerHTML = '<p>' + utils.formatDistance(business.details.distance) + '</p>'
    tr.appendChild(distanceTd)

    tr.onclick = function () {
        // closing previously opened one
        // also save the info at this point (? - there's probably a better way) USE ONBLUR!
        if (this.currentlyOpenTextArea) {
            this.notes[this.currentlyOpenTextArea.id] = this.currentlyOpenTextArea.textarea.value
            localStorage.setItem("edinburrito", JSON.stringify(this.notes))
            this.currentlyOpenTextArea.row.remove()
        }

        this.select(tr, business)  
        this.mapWrapper.googleMap.setCenter(business.coords)
        this.mapWrapper.googleMap.setZoom(16)

        // create elements
        var infoTr = document.createElement("tr")

        var infoTd = document.createElement("td")
        infoTd.setAttribute("colspan", "4")
        var textarea = document.createElement("textarea")
        textarea.id = "notes"

        // add review from localStorage if there is one
        // (set placeholder text if not)
        if (this.notes[business.details.id]) {
            textarea.innerText = this.notes[business.details.id]
        } else {
            textarea.setAttribute("placeholder", "your notes here")
        }

        // now add the elements
        infoTd.appendChild(textarea)
        infoTr.appendChild(infoTd)
        tr.parentNode.insertBefore(infoTr, tr.nextSibling) // !
        this.currentlyOpenTextArea = { row: infoTr, textarea: textarea, id: business.details.id }  // so it can be closed later
    }.bind(this)

    if (business.details.is_closed === "true") {
        tr.classList.add("currently-closed")  // TODO: see why this isn't working
    }

    return tr
}

BusinessListView.prototype.select = function (tr, business) {
    if (this.currentlySelected) {
        this.currentlySelected.classList.remove("selected")
    }
    tr.classList.add("selected")
    this.currentlySelected = tr
    this.mapWrapper.openInfoWindow(business)
}

module.exports = BusinessListView