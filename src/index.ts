import './normalize.less'
import 'https://at.alicdn.com/t/font_712012_e58cglk9ys6.js?url'
import type { App } from 'vue'
import LvIcon from './components/LvIcon.vue'
import LvButton from './components/LvButton.vue'
import LvDropdown from './components/LvDropdown.vue'
import LvInput from './components/LvInput.vue'
import LvOptions from './components/LvOptions.vue'
import LvSearch from './components/LvSearch.vue'
import LvUpload from './components/LvUpload.vue'
import LvTabs from './components/LvTabs.vue'
import LvSelect from './components/LvSelect.vue'
import LvDialog from './components/LvDialog.vue'
import LvDatePicker from './components/LvDatePicker.vue'
import LvTooltip from './components/LvTooltip.vue'

export default function (app: App) {
  app.component('LvIcon', LvIcon)
  app.component('LvButton', LvButton)
  app.component('LvDropdown', LvDropdown)
  app.component('LvInput', LvInput)
  app.component('LvOptions', LvOptions)
  app.component('LvSearch', LvSearch)
  app.component('LvUpload', LvUpload)
  app.component('LvTabs', LvTabs)
  app.component('LvSelect', LvSelect)
  app.component('LvDialog', LvDialog)
  app.component('LvDatePicker', LvDatePicker)
  app.component('LvTooltip', LvTooltip)
}
