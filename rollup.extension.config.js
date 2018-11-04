import vue from 'rollup-plugin-vue'

const production = process.env.production, cjs = process.env.cjs, esm = process.env.esm
let plugins = [
  vue({
    template: {
      isProduction: true
    }
  })
], file = 'dist/lovue.extension.js', format = 'iife'

if (cjs) {
  format = 'cjs'
  file = 'dist/lovue.extension.common.js'
}

if (esm) {
  format = 'esm'
  file = 'dist/lovue.extension.esm.js'
}

if (!production) {
  file = 'doc/js/lovue.extension.js'
  format = 'iife'
}

export default {
  input: 'src/extension.js',
  output: {
    format,
    file,
    globals: {
      vue: 'Vue'
    }
  },
  external: ['vue'],
  plugins
}

