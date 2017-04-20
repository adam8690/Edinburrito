var config = {
    entry: "./src/app.js",  // the entry point for the app, path relative to this one
    output: {
        path: "./build",
        filename: "bundle.js"
    },
    devtool: "source-map"
}

module.exports = config