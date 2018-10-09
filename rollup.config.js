import vue from 'rollup-plugin-vue'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const production = process.env.production
let plugins = [
  vue({
    template: {
      isProduction: true
    }
  })
], file = 'dist/lovue.js'

if (!production) {
  plugins.push(serve('doc'))
  plugins.push(livereload())
  file = 'doc/js/lovue.js'
}

export default {
  input: 'src/index.js',
  output: {
    format: 'iife',
    file,
    globals: {
      vue: 'Vue'
    }
  },
  external: ['vue'],
  plugins
}

