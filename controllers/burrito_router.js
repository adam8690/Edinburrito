var express = require("express")
var burritoRouter = express.Router()
var bodyParser = require('body-parser')
burritoRouter.use(bodyParser.json())

var yelp = require('./yelp')

// burritoRouter.get("/businesses", function (req, res) {
//   yelp.search({ term: 'burrito', location:'edinburgh' , limit: 50 })
//   .then(function (data) { res.json(JSON.parse(data)) })
//   .catch(function (err) { console.error(err) })
// })

// new for passing in coordinates
burritoRouter.post("/businesses", function (req, res) {
  yelp.search(req.body)
  .then(function (data) { res.json(JSON.parse(data)) })
  .catch(function (err) { res.json(err) })
})

burritoRouter.get('/businesses/:business', function(req, res) {
  yelp.business(req.params.business)
  .then(function (data) { res.json(JSON.parse(data)) })
  .catch(function (err) { res.json(err) })
})


module.exports = burritoRouter;

