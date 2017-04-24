var Utils = require('../models/utils');
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

    var image = document.createElement('img');
    image.classList.add("businessImage")
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
  div.appendChild(image);
  div.appendChild(rating);
  div.appendChild(price);
  div.appendChild(distance);
  div.appendChild(telephone);
  div.appendChild(moreInfo);
  return div;
} 

BusinessDetailView.prototype.createMoreInfoView = function (div) {
  if (this.business.moreDetails.hours) {
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
        tableDataDay.innerText = daysMap[i];
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