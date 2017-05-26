const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

module.exports = {
  entry: {
    yikeyong: './src/js/yikeyong.js'
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
    ],
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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
