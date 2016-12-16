var webpack = require("webpack");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname,
        filename: "lightsout.js"
    },
    module: {
        loaders: []
    },
    plugins: [new webpack.optimize.UglifyJsPlugin()]
};