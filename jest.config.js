module.exports = {
  "moduleFileExtensions": [
    "js",
    "json",
    "vue"
  ],
  "transform": {
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.js$": "babel-jest"
  },
  "snapshotSerializers": [
    "jest-serializer-vue"
  ],
  "globals": {
    "window": true,
    "navigator": {
      "userAgent": ""
    }
  }
}
