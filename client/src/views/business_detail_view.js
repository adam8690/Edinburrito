var Utils = require('../models/utils')
var utils = new Utils()

var BusinessDetailView = function (business) {
    this.business = business
    this.details = business.details
}

BusinessDetailView.prototype.createDetailView = function () {
    var div = document.createElement('div')
    div.classList.add('info-window')

    var name = document.createElement('p')
    name.classList.add('name') 
    name.classList.add('underline')
    name.innerText = this.details.name
    div.appendChild(name)

    var address = document.createElement('p')
    address.innerText = this.details.location.address1
    div.appendChild(address)

    if (this.details.image_url) {
        var imageDiv = document.createElement('div')
        imageDiv.id = "image-div"
    
        var image = document.createElement('img')
        image.id = "business-image"
        imageDiv.appendChild(image)
        image.src = this.details.image_url
        div.appendChild(imageDiv)
    }

    var detailsDiv = document.createElement('div')
    detailsDiv.style.display = "flex"
    detailsDiv.style.flexDirection = "row"
    detailsDiv.style.verticalAlign = "middle"

    if (this.details.price) {
        var price = document.createElement('p')
        price.innerText = this.details.price
        price.classList.add("boxed")
        detailsDiv.appendChild(price)
    }
  
    var rating = document.createElement('p')
    rating.innerHTML = this.details.rating + "&#8201;&#9733;"
    rating.classList.add("boxed")
    detailsDiv.appendChild(rating)

    var distance = document.createElement('p')
    distance.innerText = utils.formatDistance(this.details.distance)
    detailsDiv.appendChild(distance)

    div.appendChild(detailsDiv)

  
    var telephone = document.createElement('p')
    if (this.details.display_phone !== "" && this.details.display_phone) {
        telephone.innerText = "Phone: " + this.details.display_phone
        div.appendChild(telephone)
    }

    var moreInfo = document.createElement('p')
    moreInfo.id = "more-info"
    moreInfo.innerText = 'See opening hours...'
    moreInfo.addEventListener('click', function () {
        this.business.getMoreDetails(function () {
            // create the expanded view in here
            this.createMoreInfoView(div)
        }.bind(this))
    }.bind(this))

    
    div.appendChild(moreInfo)

    // this.business.getMoreDetails(function () {
    //     // create the expanded view in here
    //     this.createMoreInfoView(div)
    // }.bind(this))

    return div
} 

BusinessDetailView.prototype.createMoreInfoView = function (div) {
    moreInfo = document.querySelector("#more-info")
    if (this.business.moreDetails.hours) {
        div.removeChild(moreInfo)
        var open = document.createElement('p')
        if (this.business.moreDetails.hours["0"].is_open_now) {
            open.innerText = "currently open"
            open.classList.add("currently-open")
        } else {
            open.innerText = "currently closed"
            open.classList.add("currently-closed")
        }
        div.appendChild(open)

        var daysMap = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

        var table = document.createElement('table')
        table.id = "opening-hours-table"

        var days = this.business.moreDetails.hours["0"].open 
            for (i = 0; i < days.length; i++) {
                var tr = document.createElement('tr')
                tr.classList.add('openingHoursTableRows')

                var dayTd = document.createElement('td')
                dayTd.innerText = daysMap[days[i].day]
                dayTd.classList.add("day-column")
                tr.appendChild(dayTd)

                var startTd = document.createElement('td')
                startTd.innerText = days[i].start
                tr.appendChild(startTd)

                var toTd = document.createElement('td')
                toTd.innerHTML = "&ndash;"
                tr.appendChild(toTd)

                var endTd = document.createElement('td')
                endTd.innerText = days[i].end
                tr.appendChild(endTd)
            
                table.appendChild(tr)
            }
            div.appendChild(table)
        } else {
            // var noHours = document.createElement('p')
            // div.appendChild(noHours)
            moreInfo.innerText = "Sorry, no information available :("
        }
}

module.exports = BusinessDetailView