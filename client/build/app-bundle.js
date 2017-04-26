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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ function(module, exports, __webpack_require__) {

var Business = __webpack_require__ (4)

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
            latitude: latLng.lat,
            longitude: latLng.lng,
            limit: 50
        })
        request.send(payload)
    }
}

module.exports = Businesses

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

var Utils = __webpack_require__(0);
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

var BusinessDetailView = __webpack_require__(5);

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
         // var selectedMode = document.getElementById('#mode').value;
         directionsService.route({
           origin: origin,  // Haight.
           destination: destination,  // Ocean Beach.
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
      icon: '/images/267881.png' 
    });
    this.markers.push(marker)
    return marker;
  },

  addMyLocationMarker: function (coords) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP,
      icon: '/images/Daveault1.png'
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


  addInfoWindow: function(business, marker) {
    // var marker = this.addMarker(coords);
    detailsView = new BusinessDetailView(business);
    content = detailsView.createDetailView()    

    var infoWindow = new google.maps.InfoWindow();
    infoWindow.setContent(content);
      // infoWindow.open(this.map, marker);
     return infoWindow
   },

   openInfoWindow: function (business) {
     if (this.currentlyOpenInfoWindow) this.currentlyOpenInfoWindow.close()
     business.openInfoWindow()
     this.currentlyOpenInfoWindow = business.infoWindow
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
/* 4 */
/***/ function(module, exports) {

var Business = function(details, mapWrapper){
  this.mapWrapper = mapWrapper
  this.coords = { lat: details.coordinates.latitude, lng: details.coordinates.longitude }
  this.details = details
  this.moreDetails = null;
  this.marker = mapWrapper.addMarker(this.coords)
  this.infoWindow = mapWrapper.addInfoWindow(this, this.marker)
  this.marker.addListener("click", function() {
  this.mapWrapper.openInfoWindow(this)
  }.bind(this))

}

Business.prototype.openInfoWindow = function () {
  this.infoWindow.open(this.mapWrapper, this.marker)
},


Business.prototype.getMoreDetails = function (callback) {
    if (!this.moreDetails){
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/api/businesses/"+ this.details.id);
    request.onload = function(){
        if ( request.status !== 200 ) return 
            var jsonString = request.responseText
            var businessDetails = JSON.parse(jsonString)
            this.moreDetails = businessDetails;
            callback()
    }.bind(this)
    request.send()
  }
}

module.exports = Business

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

var Utils = __webpack_require__(0);
var utils = new Utils();

var BusinessDetailView = function(business){
this.business = business;
this.details = business.details;
}

BusinessDetailView.prototype.createDetailView = function(){
  
    var div = document.createElement('div')
    div.classList.add('infoWindow');

    var nameH1 = document.createElement('p');
    nameH1.classList.add('name');
    nameH1.innerText = this.details.name;

    var address = document.createElement('p');
    address.innerText = this.details.location.address1;

    var imageDiv = document.createElement('div');
    imageDiv.id = "image_div"
    
    var image = document.createElement('img');
    image.id = "image"
    image.classList.add("businessImage")
    imageDiv.appendChild(image);
    if (this.details.image_url){
      image.src = this.details.image_url;
    }
    else image.innerHTML = "" 
  
  var rating = document.createElement('p');
  rating.innerText = "Rating: " + this.details.rating + "★"

  var price = document.createElement('p');
  if(this.details.price){
    price.innerText = "Price: " + this.details.price
    }
  else price.innerText = "";


  var distance = document.createElement('p');
  distance.innerText = "Distance: " + utils.formatDistance(this.details.distance)

  
  var telephone = document.createElement('p');
  if(this.details.display_phone !== "" && this.details.display_phone){
    telephone.innerText = "Telephone: " + this.details.display_phone;
  }
  else {
    telephone.innerText = "";
  }


  var moreInfo = document.createElement('p');
  moreInfo.classList.add("moreInfo")
  moreInfo.innerText = 'See opening hours...';
  moreInfo.addEventListener('click', function () {
    this.business.getMoreDetails(function () {
      // create the expanded view in here.
      div.removeChild(moreInfo);
      this.createMoreInfoView(div)
    }.bind(this));
  }.bind(this));

  div.appendChild(nameH1);
  div.appendChild(address);
  if(this.details.image_url) {div.appendChild(imageDiv);}
  div.appendChild(rating);
  div.appendChild(price);
  div.appendChild(distance);
  div.appendChild(telephone);
  div.appendChild(moreInfo);
  return div;
} 

BusinessDetailView.prototype.createMoreInfoView = function (div) {
  if (this.business.moreDetails.hours) {
    console.log(this.business.moreDetails.hours["0"])
    var open = document.createElement('p')
    if (this.business.moreDetails.hours["0"].is_open_now) {
      open.innerText = "Open"
      open.classList.add("currentlyOpen")
    }
    else {
      open.innerText = "Closed"
      open.classList.add("currentlyClosed")
    }
    div.appendChild(open)

    var daysMap = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

    var openingHoursTable = document.createElement('table');
    var openingHoursTableHeading = document.createElement('th');
    openingHoursTableHeading.classList.add('openingHoursTableTitle')
    openingHoursTableHeading.innerText = "Opening Hours";
    div.appendChild(openingHoursTable);
    openingHoursTable.appendChild(openingHoursTableHeading);
    openingHoursTable.classList.add('openingHoursTable');

    var days = this.business.moreDetails.hours["0"].open 
      for(i = 0; i < days.length; i++){
        var tableRow = document.createElement('tr');
        tableRow.classList.add('openingHoursTableRows');
        var tableDataDay = document.createElement('td');
        tableDataDay.innerText = daysMap[days[i].day];
        var tableDataStart = document.createElement('td');
        tableDataStart.innerText = days[i].start;
        var tableDataTo = document.createElement('td');
        tableDataTo.innerText = "to";
        var tableDataEnd = document.createElement('td');
        tableDataEnd.innerText = days[i].end;
        
        openingHoursTable.appendChild(tableRow);
        tableRow.appendChild(tableDataDay);
        tableRow.appendChild(tableDataStart);
        tableRow.appendChild(tableDataTo);
        tableRow.appendChild(tableDataEnd);
      }
  }
  else {
    var noHours = document.createElement('p');
    noHours.innerText = "Sorry, no opening hours information available :(";
    noHours.classList.add('openingHoursTitle')
    div.appendChild(noHours);
  }
}


module.exports = BusinessDetailView

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

var MapWrapper = __webpack_require__(3)
var BusinessListView = __webpack_require__(2)
var Businesses = __webpack_require__(1)
var map
var marker

var initialize = function () {
    var mapDiv = document.querySelector("#map")
    var defaultLocation = { lat: 55.953291, lng: -3.200000 } // Edinburgh (George St)
    var mainMap = new MapWrapper(mapDiv, defaultLocation, 15)
    var body = document.querySelector("body")
    var calculateAndDisplayRoute = document.querySelector('#floating-panel')
    
    var showCredits = function () {
        flexGrid.style.opacity = 0.3
        creditsPopup.style.display = "block"
        credits.onclick = hideCredits
        body.onmouseup = hideCredits // a click anywhere will hide the popup
    }

    var hideCredits = function () {
        flexGrid.style.opacity = 1
        creditsPopup.style.display = "none"
        credits.onclick = showCredits
        body.onmouseup = null
    }

    var flexGrid = document.querySelector(".flex-grid")
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

    function myMove() {
      var elem = document.getElementById("animate");   
      var pos = 0;
      var id = setInterval(frame, 3);
      function frame() {
        if (pos == 300) {
          clearInterval(id);
        } else {
          pos++; 
          elem.style.top = pos - 'px'; 
          elem.style.left = pos + 'px'; 
        }
      }
    }

    var whereAmI = document.querySelector('#my-location')
    whereAmI.onclick = function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            var coords = {
                lat: position.coords.latitude,
                lng: position.coords.longitude }
            redraw(coords)
        })
    }

    var businesses = new Businesses(mainMap)    // getting the burrito data
    var list = document.querySelector("#list")  // setup views
    var businessListView = new BusinessListView(list, mainMap)
    businesses.done = businessListView.render.bind(businessListView)  //set callback for request
    businesses.populate(defaultLocation)        // get data from server


}



window.onload = initialize


/***/ }
/******/ ]);
//# sourceMappingURL=app-bundle.js.map