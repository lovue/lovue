import './normalize.less'
import '//at.alicdn.com/t/font_712012_e58cglk9ys6.js?url'
import { App } from 'vue'
import LvIcon from './components/LvIcon.vue'

export default function (app: App) {
  app.component('LvIcon', LvIcon)
}
