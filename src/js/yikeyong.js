import utils from './lib/utils'
import Message from './lib/message-vue'
import VueBeautyAlert from './vue/BeautyAlert.vue'
import VueDatePicker from './vue/DatePicker.vue'
import VueLoading from './vue/Loading.vue'
import VueNoCaptcha from './vue/NoCaptcha.vue'
import VuePagination from './vue/Pagination.vue'
import VuePopupWindow from './vue/PopupWindow.vue'
import VueProgressBar from './vue/ProgressBar.vue'
import VueSearch from './vue/Search.vue'
import VueSelect from './vue/Select.vue'
import VueTab from './vue/Tab.vue'
import VueTable from './vue/Table.vue'
import VueUploadButton from './vue/UploadButton.vue'
import VueSelectCity from './vue/SelectCity.vue'
import VueCrop from './vue/Crop.vue'
import VueHtmlEditor from './vue/HtmlEditor.vue'
import VuePureSelect from './vue/PureSelect.vue'
import VueCarousel from './vue/Carousel.vue'
import VueCollapse from './vue/Collapse.vue'
import VuePwdStrength from './vue/PwdStrength.vue'
import VueTableTree from './vue/TableTree.vue'

const components = [
  ['vue-beauty-alert', VueBeautyAlert],
  ['vue-date-picker', VueDatePicker],
  ['vue-loading', VueLoading],
  ['vue-no-captcha', VueNoCaptcha],
  ['vue-pagination', VuePagination],
  ['vue-popup-window', VuePopupWindow],
  ['vue-progress-bar', VueProgressBar],
  ['vue-search', VueSearch],
  ['vue-select', VueSelect],
  ['vue-tab', VueTab],
  ['vue-table', VueTable],
  ['vue-upload-button', VueUploadButton],
  ['vue-select-city', VueSelectCity],
  ['vue-crop', VueCrop],
  ['vue-html-editor', VueHtmlEditor],
  ['vue-pure-select', VuePureSelect],
  ['vue-carousel', VueCarousel],
  ['vue-collapse', VueCollapse],
  ['vue-pwd-strength', VuePwdStrength],
  ['vue-table-tree', VueTableTree]
]

if (typeof window !== 'undefined' && window.Vue) {
  window.utils = utils

  components.forEach(c => {
    Vue.component(c[0], c[1])
  })

  Vue.prototype.$msg = Message
}