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
    extensions: ['', '.js', '.json'],
    fallback: [path.join(__dirname, './node_modules')],
    alias: {
      'components': path.resolve(__dirname, './src/components')
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
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}
