var config = {
    entry: {
      app: "./src/app.js",
      burrito: "./src/burrito.js"
    },  // the entry point for the app, path relative to this one
    output: {
        path: "./build",
        filename: "[name]-bundle.js"
    },
    devtool: "source-map"
}

module.exports = config