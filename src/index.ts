import './normalize.less'
import 'https://at.alicdn.com/t/font_712012_e58cglk9ys6.js?url'
import { App } from 'vue'
import LvIcon from './components/LvIcon.vue'
import LvButton from './components/LvButton.vue'
import LvDropdown from './components/LvDropdown.vue'
import LvInput from './components/LvInput.vue'
import LvOptions from './components/LvOptions.vue'
import LvSearch from './components/LvSearch.vue'
import LvUpload from './components/LvUpload.vue'

export default function (app: App) {
  app.component('LvIcon', LvIcon)
  app.component('LvButton', LvButton)
  app.component('LvDropdown', LvDropdown)
  app.component('LvInput', LvInput)
  app.component('LvOptions', LvOptions)
  app.component('LvSearch', LvSearch)
  app.component('LvUpload', LvUpload)
}
