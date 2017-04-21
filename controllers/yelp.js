var Yelp = require('yelpv3');
var apiCreds = require('../api_creds')

var yelp = new Yelp(apiCreds);

// api credentials are held in a separate gitignored file so they are not public. The object looks like this: 
// var apiCreds = {
//   app_id: '******',
//   app_secret: '***************'
// };

// https://www.yelp.com/developers/documentation/v3/business_search


module.exports = yelp;