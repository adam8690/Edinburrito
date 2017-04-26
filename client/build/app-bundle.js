/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ function(module, exports) {

var Utils = function(){

}

Utils.prototype.formatDistance = function (distance) {
    result = Math.round(distance)
    if (result < 1000) {
        return result + "m"
    } else { 
        result /= 1000
        return result.toFixed(1) + "km"
    }
}

module.exports = Utils;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

var Business = __webpack_require__ (6)

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

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

var Utils = __webpack_require__(1);
var utils = new Utils();

var BusinessListView = function (container, mapWrapper) {
    this.container = container  // is the <table id="list">
    this.mapWrapper = mapWrapper
    this.currentlySelected = null
    this.currentSort = "distance"  // initial setting
    this.currentlyOpenInfoWindow = null
    this.currentlyOpenTextArea = null
    this.currentLocation = null 
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
        if (this.currentLocation) { // you need to have geolocated first
            this.mapWrapper.calculateAndDisplayRoute(this.mapWrapper.directionsService, this.mapWrapper.directionsDisplay, this.currentLocation, business.coords, 'WALKING');         
        }

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

/***/ },
/* 5 */
/***/ function(module, exports) {

var MapWrapper = function(container, coords, zoom){
  this.currentlyOpenInfoWindow = null
  this.markers = []
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
  this.directionsDisplay = new google.maps.DirectionsRenderer;
  this.directionsService = new google.maps.DirectionsService;
  this.directionsDisplay.setMap(this.googleMap);
}

MapWrapper.prototype = {

  calculateAndDisplayRoute: function(directionsService, directionsDisplay,origin, destination, selectedMode) {
         directionsService.route({
           origin: origin,
           destination: destination,
           travelMode: google.maps.TravelMode[selectedMode]
         }, function(response, status) {
           if (status == 'OK') {
             directionsDisplay.setDirections(response);
           } // no route will be shown if no available results (ZERO_RESULTS etc)
         });
       },

  addMarker: function (coords) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP,
      icon: '/images/burrito.png' 
    });
    this.markers.push(marker)
    return marker;
  },

  addMyLocationMarker: function (coords) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP,
      icon: '/images/minion.png'
    })
    this.markers.push(marker)
    return marker
  },

   removeMarkers: function(){
      for(i=0; i< this.markers.length; i++){
          this.markers[i].setMap(null);
      }
  },

  addClickEvent: function(){
    google.maps.event.addListener(this.googleMap, 'click', function(event){
      var position = { lat: event.latLng.lat(), lng: event.latLng.lng() }  
      this.addMarker(position);
    }.bind(this));
  },

  openInfoWindow: function (business) {
    if (this.currentlyOpenInfoWindow) this.currentlyOpenInfoWindow.close()
    // this next line is brutal:
    business.infoWindow.infoWindow.open(business.mapWrapper.googleMap, business.marker)
    this.currentlyOpenInfoWindow = business.infoWindow.infoWindow
  },

    reposition: function(coords) {
        this.removeMarkers()
        this.googleMap.setCenter(coords);
        this.googleMap.setZoom(16);
        this.addMyLocationMarker(coords)
    }

}

module.exports = MapWrapper 

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

var BusinessInfoWindow = __webpack_require__(13)

var Business = function (details, mapWrapper) {
    this.mapWrapper = mapWrapper
    this.coords = { lat: details.coordinates.latitude, lng: details.coordinates.longitude }
    this.details = details
    this.moreDetails = null
    this.infoWindow = new BusinessInfoWindow(this)
    this.marker = mapWrapper.addMarker(this.coords)
    this.marker.addListener("click", function() {
        this.infoWindow.open()
    }.bind(this))
}

module.exports = Business

/***/ },
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

var MapWrapper = __webpack_require__(5)
var BusinessListView = __webpack_require__(4)
var Businesses = __webpack_require__(2)
var map
var marker

var initialize = function () {
    var mapDiv = document.querySelector("#map")
    var defaultLocation = { lat: 55.953291, lng: -3.200000 } // Edinburgh (George St)
    var mainMap = new MapWrapper(mapDiv, defaultLocation, 15)
    var body = document.querySelector("body")
    var calculateAndDisplayRoute = document.querySelector('#floating-panel')
    
    var showCredits = function () {
        flexContainer.style.opacity = 0.3
        creditsPopup.style.display = "block"
        credits.onclick = hideCredits
        body.onmouseup = hideCredits // a click anywhere will hide the popup
    }

    var hideCredits = function () {
        flexContainer.style.opacity = 1
        creditsPopup.style.display = "none"
        credits.onclick = showCredits
        body.onmouseup = null
    }

    var flexContainer = document.querySelector("#flex-container")
    var creditsPopup = document.querySelector("#credits-popup")
    creditsPopup.onclick = hideCredits
    var credits = document.querySelector("#credits-text")
    credits.onclick = showCredits

    var search = document.querySelector('#location')
    search.onkeydown = function (e) {
        if (e.keyCode === 13) {        // 13 = Enter
            searchAddress(this.value)
        }
    }

    function redraw(coords) {
        businessListView.currentLocation = coords
        mainMap.reposition(coords)
        businesses.populate(coords)
    }

    function searchAddress(searchString) {
        var geocoder = new google.maps.Geocoder()
        geocoder.geocode({ address: searchString }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var coords = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                }
                redraw(coords)
            }
        })
    }

    var whereAmI = document.querySelector('#my-location')
    var van = document.querySelector("#van")
    // must reset the animation once it's completed, otherwise cannot be retriggered
    van.addEventListener("animationend", function () { van.style.animation = "" })
    whereAmI.onclick = function () {
        van.style.animation = "van-progress 5s ease-in 0s 1"
        navigator.geolocation.getCurrentPosition(function (position) {
            var coords = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            redraw(coords)
        })
    }



    var businesses = new Businesses(mainMap)    // getting the burrito data
    var list = document.querySelector("#business-list")  // setup views
    var businessListView = new BusinessListView(list, mainMap)
    businesses.done = businessListView.render.bind(businessListView)  //set callback for request
    businesses.populate(defaultLocation)        // get data from server
}

window.onload = initialize

/***/ },
/* 12 */,
/* 13 */
/***/ function(module, exports, __webpack_require__) {

var BusinessInfoWindowContent = __webpack_require__(14)

var BusinessInfoWindow = function (business) {
    this.business = business
    this.content = new BusinessInfoWindowContent(this.business)
    this.infoWindow = new google.maps.InfoWindow()
    this.infoWindow.setContent(this.content.createContentDiv())
}

// just a wrapper so we can say business.infoWindow.open()
// rather than business.infoWindow.infoWindow.open(args)
// it passes through to mapWrapper, which does the actual opening
// since the mapWrapper also handles closing any previously opened InfoWindows
BusinessInfoWindow.prototype.open = function () {
    this.business.mapWrapper.openInfoWindow(this.business)
    this.getMoreDetails(this.content.expandContent.bind(this.content))  // !
}

BusinessInfoWindow.prototype.getMoreDetails = function (callback) {
    if (!this.moreDetails){
        var request = new XMLHttpRequest();
        request.open("GET", "http://localhost:3000/api/businesses/"+ this.business.details.id);
        request.onload = function(){
            if ( request.status !== 200 ) return 
                var jsonString = request.responseText
                var moreDetails = JSON.parse(jsonString)
                callback(moreDetails)
        }
        request.send()
    }
}

module.exports = BusinessInfoWindow

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

var Utils = __webpack_require__(1)
var utils = new Utils()

var BusinessInfoWindowContent = function (business) {
    this.business = business
    this.details = business.details
    this.div = document.createElement('div')
}

BusinessInfoWindowContent.prototype.createContentDiv = function () {
    // var div = document.createElement('div')
    this.div.classList.add('info-window')

    var name = document.createElement('p')
    name.classList.add('name') 
    name.classList.add('underline')
    name.innerText = this.details.name
    this.div.appendChild(name)

    var address = document.createElement('p')
    address.innerText = this.details.location.address1
    this.div.appendChild(address)

    if (this.details.image_url) {
        var imageDiv = document.createElement('div')
        imageDiv.id = "image-div"
    
        var image = document.createElement('img')
        image.id = "business-image"
        imageDiv.appendChild(image)
        image.src = this.details.image_url
        this.div.appendChild(imageDiv)
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

    this.div.appendChild(detailsDiv)

    var telephone = document.createElement('p')
    if (this.details.display_phone !== "" && this.details.display_phone) {
        telephone.innerText = "Phone: " + this.details.display_phone
        this.div.appendChild(telephone)
    }

    var openingHours = document.createElement('p')
    openingHours.id = "opening-hours"
    openingHours.classList.add("greyed-out")
    openingHours.innerText = 'Fetching opening hours...'
    this.div.appendChild(openingHours)

    return this.div
} 

BusinessInfoWindowContent.prototype.expandContent = function (moreDetails) {
    var openingHours = document.querySelector("#opening-hours")
    if (moreDetails.hours) {
        openingHours.innerText = "See opening hours..."
        openingHours.classList.remove("greyed-out")
        openingHours.classList.add("opening-hours-link")
        openingHours.addEventListener("click", function () {
            this.buildOpeningHoursTable(moreDetails)
            this.div.removeChild(openingHours)
        }.bind(this))
    } else {
        openingHours.innerText = "Sorry, no opening hours available"
    }
}

BusinessInfoWindowContent.prototype.buildOpeningHoursTable = function (moreDetails) {
    var open = document.createElement('p')
    if (moreDetails.hours["0"].is_open_now) {
        open.innerText = "currently open"
        open.classList.add("currently-open")
    } else {
        open.innerText = "currently closed"
        open.classList.add("currently-closed")
    }
    this.div.appendChild(open)

    var daysMap = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

    var table = document.createElement('table')
    table.id = "opening-hours-table"

    var days = moreDetails.hours["0"].open 
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
        this.div.appendChild(table)
}

module.exports = BusinessInfoWindowContent

/***/ }
/******/ ]);
//# sourceMappingURL=app-bundle.js.map