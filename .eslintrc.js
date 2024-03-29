/* global module */
module.exports = {
  env: {
    browser: true,
    es2022: true,
    'vue/setup-compiler-macros': true // enable global defineProps, defineEmits
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attributes-order': 'off',
    'vue/max-attributes-per-line': ['error', {
      'singleline': 5
    }],
    'vue/require-default-prop': 'off',
    'vue/multiline-html-element-content-newline': 'off'
  }
}
