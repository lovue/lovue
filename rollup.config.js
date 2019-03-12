import vue from 'rollup-plugin-vue'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const production = process.env.production, esm = process.env.esm
let plugins = [
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
    delay: 100
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
  external: ['vue'],
  plugins
}

