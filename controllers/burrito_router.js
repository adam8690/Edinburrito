var express = require("express")
var burritoRouter = express.Router()

burritoRouter.get("/", function (req, res) {
    res.json({ dummy: "data", for: "now" })
})

module.exports = burritoRouter