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
