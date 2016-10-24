const webpack = require('webpack')

module.exports = {
    entry: {
      index: "./src/js/index.js"
    },
    output: {
        path: __dirname + "/public/js",
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: "vue"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel"
            }
        ]
    },
    babel: {
        presets: ["es2015"],
        plugins: ["transform-runtime"]
    }
}
