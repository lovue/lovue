import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/extension.js',
  output: [{
    format: 'iife',
    file: 'dist/lovue.extension.js',
    name: 'lovueEx',
    globals: {
      vue: 'Vue'
    },
    preferConst: true,
    exports: 'named'
  }, {
    format: 'esm',
    file: 'dist/lovue.extension.esm.js',
    globals: {
      vue: 'Vue',
      window: 'window'
    },
    preferConst: true,
    exports: 'named'
  }],
  external: id => id === 'vue' || id.endsWith('.less'),
  plugins: [
    commonjs(),
    vue({
      template: {
        isProduction: true
      }
    })
  ]
}

