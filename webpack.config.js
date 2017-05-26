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
      modules: [
        path.join(__dirname, 'src'),
        'node_modules'
      ]
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: [{ loader: 'vue-loader' }]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader' }]
        }
      ]
    }
}
