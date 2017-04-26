var express = require("express")
var router = express.Router()
var path = require("path")

router.use("/api", require("./burrito_router.js"))

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/../client/index.html"))
})

router.get("/burrito", function (req, res) {
    res.sendFile(path.join(__dirname + "/../client/burrito_facts.html"))
})

module.exports = router