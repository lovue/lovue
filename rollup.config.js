import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import lovueConfig from './rollup/lovue'
import extensionConfig from './rollup/extension'

const production = process.env.production

if (!production) {
  lovueConfig.push(serve('doc'))
  lovueConfig.push(livereload({
    watch: 'doc',
    delay: 100,
    port: 35730
  }))
  lovueConfig.output = {
    format: 'iife',
    file: 'doc/js/lovue.js',
    name: 'lovue',
    globals: {
      vue: 'Vue',
      window: 'window'
    },
    preferConst: true,
    exports: 'named'
  }

  extensionConfig.output = {
    format: 'iife',
    file: 'doc/js/lovue.extension.js',
    name: 'lovueEx',
    globals: {
      vue: 'Vue',
      window: 'window'
    },
    preferConst: true,
    exports: 'named'
  }
}


export default [lovueConfig, extensionConfig]

