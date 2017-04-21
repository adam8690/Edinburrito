var Yelp = require('yelpv3');
var apiCreds = require('../api_creds')

var yelp = new Yelp(apiCreds);



// https://www.yelp.com/developers/documentation/v3/business_search


module.exports = yelp;