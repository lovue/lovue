const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const UglifyEsPlugin = require('uglify-es-webpack-plugin')

module.exports = {
  entry: {
    lovue: './src/js/lovue.js'
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: '[name].min.js'
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
  },
  plugins: [
    new UglifyEsPlugin({ compress: { warnings: false } })
  ]
}
