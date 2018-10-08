const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const argv = require('yargs').argv

const isProd = argv.mode === 'production'

let plugins = [
  new VueLoaderPlugin()
]

if (isProd) {
  plugins = [
    new VueLoaderPlugin(),
    new UglifyJSPlugin({ sourceMap: true })
  ]
}

module.exports = {
  entry: {
    lovue: './src/index.js'
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: isProd ? 'lovue.min.js' : 'lovue.js'
  },
  stats: {
    entrypoints: false
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
        use: { loader: 'vue-loader' }
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      }
    ]
  },
  plugins
}
