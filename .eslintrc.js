module.exports = {
  env: {
    'es6': true
  },
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'eslint:recommended',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'for-direction': 'error',
    'no-await-in-loop': 'warn',
    'no-extra-parens': 'warn',
    'accessor-pairs': 'error',
    'default-case': 'error',
    'eqeqeq': 'warn',
    'no-alert': 'error',
    'no-caller': 'error',
    'no-else-return': 'warn',
    'no-empty': 'off',
    'no-empty-function': 'warn',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'warn',
    'no-extra-label': 'warn',
    'no-floating-decimal': 'error',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-iterator': 'error',
    'no-labels': 'warn',
    'no-lone-blocks': 'error',
    'no-loop-func': 'warn',
    'no-multi-spaces': 'error',
    'no-multi-str': 'warn',
    'no-new':　'off',
    'no-new-func': 'error',
    'no-new-wrappers': 'warn',
    'no-param-reassign': 'off',
    'no-proto': 'warn',
    'no-return-assign': 'off',
    'no-script-url': 'warn',
    'no-self-compare': 'error',
    'no-sequences': 'warn',
    'no-unmodified-loop-condition': 'warn',
    'no-unused-expressions': 'off',
    'no-useless-escape': 'off',
    'no-void': 'error',
    'no-with':　'error',
    'require-await': 'error',
    'quotes': ['warn', 'single'],
    'indent': ['error', 2, {
      SwitchCase: 1
    }],
    'linebreak-style': ['error', 'unix'],
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-console': 'off',
    'comma-dangle': ['error', 'never'],
    'no-shadow': 'error',
    'no-shadow-restricted-names': 'error',
    'no-undefined': 'off',
    'no-use-before-define': 'error',
    'comma-spacing': 'warn',
    'func-call-spacing': 'error',
    'keyword-spacing': 'error',
    'arrow-spacing': 'warn',
    'no-confusing-arrow': 'error',
    'no-duplicate-imports': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-var': 'off',
    'object-shorthand': 'warn',
    'prefer-template': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
