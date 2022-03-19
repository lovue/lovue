import './normalize.less'
import 'https://at.alicdn.com/t/font_712012_e58cglk9ys6.js?url'
import { App } from 'vue'
import LvIcon from './components/LvIcon.vue'
import LvButton from './components/LvButton.vue'

export default function (app: App) {
  app.component('LvIcon', LvIcon)
  app.component('LvButton', LvButton)
}
