var express = require("express")
var burritoRouter = express.Router()
var yelp = require('./yelp')

burritoRouter.get("/", function (req, res) {
    yelpResults = yelp.search({term: 'burrito', location: 'edinburgh', limit: 10})
    .then(function (data) {
      res.json(JSON.parse(data).businesses);
    })
    
    .catch(function (err) {console.error(err);});
  
})

module.exports = burritoRouter