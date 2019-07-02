import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'
import less from 'rollup-plugin-less'

const production = process.env.production, cjs = process.env.cjs, esm = process.env.esm
let plugins = [
  commonjs(),
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
  plugins.push(less({
    insert: true,
    output: false,
    option: {
      strictMath: 'on'
    }
  }))
  file = 'doc/js/lovue.extension.js'
  format = 'iife'
} else {
  plugins.push(less({
    insert: false,
    output: false,
    option: {
      strictMath: 'on'
    }
  }))
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
    },
    preferConst: true,
    exports: 'named'
  },
  external: ['vue'],
  plugins
}

