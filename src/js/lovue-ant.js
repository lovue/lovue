import './lib/iconfont'
import { getype } from 'lovue-utils'


import VueNoCaptcha from './vue/NoCaptcha.vue'
import VuePopupWindow from './vue/PopupWindow.vue'
import VueTable from './vue/Table.vue'
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
import VueTreeList from './vue/TreeList.vue'
import VueImgReflex from './vue/ImgReflex.vue'

import Message from './vue-ant/Message.vue'
import Row from './vue-ant/Row.vue'
import Col from './vue-ant/Col.vue'
import Icon from './vue-ant/Icon.vue'
import Button from './vue-ant/Button.vue'
import ButtonGroup from './vue-ant/ButtonGroup.vue'
import Menu from './vue-ant/Menu.vue'
import Radio from './vue-ant/Radio.vue'
import Checkbox from './vue-ant/Checkbox.vue'
import Switch from './vue-ant/Switch.vue'
import Search from './vue-ant/Search.vue'
import Upload from './vue-ant/Upload.vue'
import Tab from './vue-ant/Tab.vue'
import Steps from './vue-ant/Steps.vue'
import Select from './vue-ant/Select.vue'
import PureSelect from './vue-ant/PureSelect.vue'
import Progress from './vue-ant/Progress.vue'
import Pagination from './vue-ant/Pagination.vue'
import DatePicker from './vue-ant/DatePicker.vue'

const components = [
  ['vue-no-captcha', VueNoCaptcha],
  ['vue-popup-window', VuePopupWindow],
  ['vue-table', VueTable],
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
  Switch,
  Search,
  Upload,
  Tab,
  Steps,
  Select,
  PureSelect,
  Progress,
  Pagination,
  DatePicker
]

if (typeof window !== 'undefined' && window.Vue) {
  components.forEach(c => {
    Vue.component(c[0], c[1])
  })

  Ants.forEach(a => {
    Vue.component(a.name, a)
  })

  const MessageConstructor = Vue.extend(Message)

  const Msg = function (option) {
    let instance
    option = option || {}

    if (getype(option) === 'string') {
      option = {
        message: option
      }
    }

    instance = new MessageConstructor({
      data: option
    })
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    instance.vm.visible = true
  }

  Vue.prototype.$msg = Msg
  Vue.prototype.success = msg => Msg(msg)
  Vue.prototype.info = msg => {
    Msg({
      type: 'info',
      message: msg
    })
  }
  Vue.prototype.warn = msg => {
    Msg({
      type: 'warn',
      message: msg
    })
  }
  Vue.prototype.error = (msg, close) => {
    if (close === undefined) close = true

    if (getype(msg) === 'error') {
      msg = msg.message
    }

    Msg({
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
