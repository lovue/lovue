import './lib/iconfont'
import { getype } from 'lovue-utils'
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
import VueExcel from './vue/Excel.vue'
import VuePwdValidity from './vue/PwdValidity.vue'
import VueSubmitButton from './vue/SubmitButton.vue'
import VueTreeList from './vue/TreeList.vue'
import VueImgReflex from './vue/ImgReflex.vue'

import Row from './vue-ant/Row.vue'
import Col from './vue-ant/Col.vue'
import Icon from './vue-ant/Icon.vue'
import Button from './vue-ant/Button.vue'
import ButtonGroup from './vue-ant/ButtonGroup.vue'
import Menu from './vue-ant/Menu.vue'
import Radio from './vue-ant/Radio.vue'
import Checkbox from './vue-ant/Checkbox.vue'
import Switch from './vue-ant/Switch.vue'

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
  ['vue-table-tree', VueTableTree],
  ['vue-excel', VueExcel],
  ['vue-pwd-validity', VuePwdValidity],
  ['vue-submit-button', VueSubmitButton],
  ['vue-tree-list', VueTreeList],
  ['vue-img-reflex', VueImgReflex]
]

const Ants = [
  Row,
  Col,
  Icon,
  Button,
  ButtonGroup,
  Menu,
  Radio,
  Checkbox,
  Switch
]

if (typeof window !== 'undefined' && window.Vue) {
  components.forEach(c => {
    Vue.component(c[0], c[1])
  })

  Ants.forEach(a => {
    Vue.component(a.name, a)
  })

  Vue.prototype.$msg = Message
  Vue.prototype.success = msg => Message(msg)
  Vue.prototype.info = msg => {
    Message({
      type: 'info',
      message: msg
    })
  }
  Vue.prototype.warn = msg => {
    Message({
      type: 'warn',
      message: msg
    })
  }
  Vue.prototype.error = (msg, close) => {
    if (close === undefined) close = true

    if (getype(msg) === 'error') {
      msg = msg.message
    }

    Message({
      type: 'error',
      message: msg,
      showClose: close
    })
  }

  Vue.config.errorHandler = (error, vm) => {
    vm.error(error)
  }

  Vue.config.warnHandler = (warn, vm) => {
    vm.error(warn)
  }
}
