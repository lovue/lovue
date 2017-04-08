const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

module.exports = {
    entry: {
      index: './src/js/index.js',
      yikeyong: './src/js/yikeyong.js'
    },
    output: {
        path: __dirname + "/public/js",
        publicPath: '/',
        filename: "[name].js"
    },
    resolve: {
      extensions: ['', '.js', '.json'],
      fallback: [path.join(__dirname, './node_modules')],
      alias: {
        'components': path.resolve(__dirname, './src/js/vue')
      }
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
    }
}
