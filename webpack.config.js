const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

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
        path: __dirname + "/public/js",
        publicPath: '/',
        filename: "[name].bundle.js"
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
