var BusinessDetailView = require('./business_detail_view.js');

var MapWrapper = function(container, coords, zoom){
  this.currentlyOpenInfoWindow = null
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
}


MapWrapper.prototype = {

  // goToSearchLocation: function(){
  //   var input = document.getElementById('pac-input');
  //          var searchBox = new google.maps.places.SearchBox(input);
  //          map.controls[google.maps.ControlPosition.TOP_LEFT].push(input)
  //          map.addListener('bounds_changed', function() {
  //                   searchBox.setBounds(map.getBounds());
  //                 });
           // var markers = [];
           //        // Listen for the event fired when the user selects a prediction and retrieve
           //        // more details for that place.
           //        searchBox.addListener('places_changed', function() {
           //          var places = searchBox.getPlaces();

           //          if (places.length == 0) {
           //            return;
           //          }

           //          // Clear out the old markers.
           //          markers.forEach(function(marker) {
           //            marker.setMap(null);
           //          });
           //          markers = [];

                    // For each place, get the icon, name and location.
                    // var bounds = new google.maps.LatLngBounds();
                    // places.forEach(function(place) {
                    //   if (!place.geometry) {
                    //     console.log("Returned place contains no geometry");
                    //     return;
                    //   }
                    //   var icon = {
                    //     url: place.icon,
                    //     size: new google.maps.Size(71, 71),
                    //     origin: new google.maps.Point(0, 0),
                    //     anchor: new google.maps.Point(17, 34),
                    //     scaledSize: new google.maps.Size(25, 25)
                    //   };

                //       // Create a marker for each place.
                //       markers.push(new google.maps.Marker({
                //         map: map,
                //         icon: icon,
                //         title: place.name,
                //         position: place.geometry.location
                //       }));

                //       if (place.geometry.viewport) {
                //         // Only geocodes have viewport.
                //         bounds.union(place.geometry.viewport);
                //       } else {
                //         bounds.extend(place.geometry.location);
                //       }
                //     });
                //     map.fitBounds(bounds);
                //   });
                // }
  // },

  
  addMarker: function(coords){
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP,
      icon: 'http://localhost:3000/images/267881.png'      
    });

    return marker;
  },

  addMyLocationMarker: function(coords){
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP,
      icon: 'http://localhost:3000/images/Daveault1.png'
    })
    return marker
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

    // updateInfoWindow: function (business) {
    //   oldContent = business.infoWindow.content
    //   newContent = business.moreDetails.phone
    //   // if (this.currentlyOpenInfoWindow) this.currentlyOpenInfoWindow.close()
    //   business.infoWindow = new google.maps.InfoWindow({
    //   content: oldContent + newContent
    // });
    //   // this.openInfoWindow(business)
    //   // this.currentlyOpenInfoWindow = business.infoWindow
    //  },

  // geoLocate: function(){
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     var center = {lat: position.coords.latitude, lng: position.coords.longitude}; 
  //     this.googleMap.setCenter(center); 
  //     this.addMarker(center);
  //   }.bind(this)); 
  // }
}

module.exports = MapWrapper 