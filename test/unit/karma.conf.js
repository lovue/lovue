const path = reuire('path')

let webpackConfig = {
  resolve: {
    modules: [
      path.join(__dirname, '../../src'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['istanbul']
          }
        }
      }
    ]
  }
}

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon-chai'],
    files: [
      './index.js'
    ],
    exclude: [],
    preprocessors:{
      './index.js': ['webpack', 'sourcemap']
    },
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summaray' }
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  })
}
