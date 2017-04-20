var express = require("express")
var router = express.Router()
var path = require("path")

router.use("/api/burrito", require("./burrito_router.js"))

router.get("/", function (req, res) {
    // before you have index.html set up, you can just send this for testing:
    // res.json({ data: "Hello from my API" })
    res.sendFile(path.join(__dirname + "/../client/index.html"))
})

module.exports = router