// boilerplate for app_thing_router.js

var express = require("express")
var appThingRouter = express.Router()

appThingRouter.get("/", function (req, res) {
    // eventually, use our DB object to go to Mongo and get all the planets
    res.json({ dummy: "data", for: "now" })
})

module.exports = appThingRouter