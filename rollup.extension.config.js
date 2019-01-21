import vue from 'rollup-plugin-vue'

const production = process.env.production, cjs = process.env.cjs, esm = process.env.esm
let plugins = [
  vue({
    template: {
      isProduction: true
    }
  })
], file = 'dist/lovue.extension.js', format = 'iife', name = 'lovueEx'

if (cjs) {
  format = 'cjs'
  file = 'dist/lovue.extension.common.js'
  name = undefined
}

if (esm) {
  format = 'esm'
  file = 'dist/lovue.extension.esm.js'
  name = undefined
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
    name,
    globals: {
      vue: 'Vue',
      window: 'window'
    }
  },
  external: ['vue'],
  plugins
}

