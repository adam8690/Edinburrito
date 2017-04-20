var Yelp = require('yelpv3');


var yelp = new Yelp({
  app_id: '***REMOVED***',
  app_secret: '***REMOVED***'
});

// https://www.yelp.com/developers/documentation/v3/business_search


module.exports = yelp;