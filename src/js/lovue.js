import './js/lib/iconfont'
import { getype } from 'lovue-utils'
import Message from './vue-ant/Message.vue'
import Modal from './vue-ant/Modal.vue'
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
import PwdStrength from './vue-ant/PwdStrength.vue'
import Popup from './vue-ant/Popup.vue'

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
  DatePicker,
  PwdStrength,
  Popup
]

if (typeof window !== 'undefined' && window.Vue) {
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

  Object.defineProperties(Vue.prototype, {
    $msg: {
      value: Msg
    },
    success: {
      value: msg => Msg(msg)
    },
    info: {
      value: msg => {
        Msg({
          type: 'info',
          message: msg
        })
      }
    },
    warn: {
      value: msg => {
        Msg({
          type: 'warn',
          message: msg
        })
      }
    },
    error: {
      value: (msg, close) => {
        if (close === undefined) close = true

        if (getype(msg) === 'error') {
          console.error(msg)
          return
        }

        if (getype(msg) === 'string') {
          Msg({
            type: 'error',
            message: msg,
            showClose: close
          })
        }
      }
    },
    $modal: {
      value: function (option = {}) {
        let instance
        if (typeof option === 'string') {
          option = {
            content: option
          }
        }

        const Constructor = Vue.extend(Modal)
        instance = new Constructor({
          data: option
        })
        instance.vm = instance.$mount()
        document.body.appendChild(instance.vm.$el)
        instance.vm.visible = true
      }
    }
  })

  Vue.config.errorHandler = (error, vm) => {
    vm.error(error)
  }

  Vue.config.warnHandler = (warn, vm) => {
    vm.error(warn)
  }
}
