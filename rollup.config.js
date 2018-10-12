import vue from 'rollup-plugin-vue'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const production = process.env.production, cjs = process.env.cjs, esm = process.env.esm
let plugins = [
  vue({
    template: {
      isProduction: true
    }
  })
], file = 'dist/lovue.js', format = 'iife'

if (cjs) {
  format = 'cjs'
  file = 'dist/lovue.common.js'
}

if (esm) {
  format = 'esm'
  file = 'dist/lovue.esm.js'
}

if (!production) {
  plugins.push(serve('doc'))
  plugins.push(livereload())
  file = 'doc/js/lovue.js'
  format = 'iife'
}

export default {
  input: 'src/index.js',
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

