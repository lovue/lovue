import vue from 'rollup-plugin-vue'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import commonjs from 'rollup-plugin-commonjs'

const production = process.env.production, esm = process.env.esm
let plugins = [
  commonjs(),
  vue({
    template: {
      isProduction: true
    }
  })
], file = 'dist/lovue.js', format = 'iife', name = 'lovue'

if (esm) {
  format = 'esm'
  file = 'dist/lovue.esm.js'
  name = undefined
}

if (!production) {
  plugins.push(serve('doc'))
  plugins.push(livereload({
    watch: 'doc',
    delay: 100,
    port: 35730
  }))
  file = 'doc/js/lovue.js'
  format = 'iife'
}

export default {
  input: 'src/index.js',
  output: {
    format,
    file,
    name,
    globals: {
      vue: 'Vue'
    },
    preferConst: true,
    exports: 'named'
  },
  external: id => id === 'vue' || id.endsWith('.less'),
  plugins
}

