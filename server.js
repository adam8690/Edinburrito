// boilerplate for server.js

var express = require("express")
var app = express()

app.use(require("./controllers/index.js"))

app.use(express.static("client/build"))  // where the index.html and bundle.js (etc) will be

app.listen(3000, function () {
    console.log("App is listening on port 3000.")
})