const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const projectRoot = path.resolve(__dirname, 'src')

function entries() {
  let basePath = './src/js',
    obj = {},
    files = fs.readdirSync(basePath)

  files.forEach(file => {
    let stat = fs.statSync(basePath + '/' + file)
    if (stat.isFile()) {
      let name = file.slice(0, -3)
      obj[name] = basePath + '/' + file
    }
  })

  return obj
}

module.exports = {
  entry: entries(),
  output: {
    path: __dirname + '/public/js',
    publicPath: '/',
    filename: '[name].bundle.js'
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
  ],
  babel: {
    presets: ['es2015', 'stage-2'],
    plugins: ['transform-runtime']
  }
}
