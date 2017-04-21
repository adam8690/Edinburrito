var express = require("express")
var burritoRouter = express.Router()
var yelp = require('./yelp')

burritoRouter.get("/", function (req, res) {
    var yelpResults = yelp.search({ term: 'burrito', location: 'edinburgh', limit: 20 })
      .then(function (data) { res.json(JSON.parse(data)) })
      .catch(function (err) { console.error(err) })
})

burritoRouter.get('/business', function(req, res) {
  var yelpResults = yelp.business('yuko-kitchen-los-angeles')
.then(function (data) { res.json(JSON.parse(data)) })
.catch(function (err) { res.json(err);});
})

module.exports = burritoRouter
