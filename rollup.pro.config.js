import vue from 'rollup-plugin-vue'

const production = process.env.production, cjs = process.env.cjs, esm = process.env.esm
let plugins = [
  vue({
    template: {
      isProduction: true
    }
  })
], file = 'dist/lovue.pro.js', format = 'iife'

if (cjs) {
  format = 'cjs'
  file = 'dist/lovue.pro.common.js'
}

if (esm) {
  format = 'esm'
  file = 'dist/lovue.pro.esm.js'
}

if (!production) {
  file = 'doc/js/lovue.pro.js'
  format = 'iife'
}

export default {
  input: 'src/pro.js',
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

