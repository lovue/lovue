module.exports = {
  "env": {
    "es6": true
  },
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    "ecmaVersion": 6,
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'eslint:recommended',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    "indent": "off",
    "linebreak-style": [
      "error",
      "unix"
    ],
    "no-undef": "off",
    "no-unused-vars": "off",
    "no-console": "off",
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
