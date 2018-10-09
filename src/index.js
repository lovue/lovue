import Vue from 'vue'
import Message from './components/Message.vue'
import Modal from './components/Modal.vue'
import Row from './components/Row.vue'
import Col from './components/Col.vue'
import Icon from './components/Icon.vue'
import Button from './components/Button.vue'
import ButtonGroup from './components/ButtonGroup.vue'
import Menu from './components/Menu.vue'
import Radio from './components/Radio.vue'
import Checkbox from './components/Checkbox.vue'
import Switch from './components/Switch.vue'
import Search from './components/Search.vue'
import Upload from './components/Upload.vue'
import Tab from './components/Tab.vue'
import Steps from './components/Steps.vue'
import Select from './components/Select.vue'
import PureSelect from './components/PureSelect.vue'
import Progress from './components/Progress.vue'
import Pagination from './components/Pagination.vue'
import DatePicker from './components/DatePicker.vue'
import PwdStrength from './components/PwdStrength.vue'
import Popup from './components/Popup.vue'

if (!NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach
}

const Components = [
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
Components.forEach(a => {
  Vue.component(a.name, a)
})

const MessageConstructor = Vue.extend(Message)

const Msg = function (option) {
  let instance
  option = option || {}

  if (typeof option === 'string') {
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

      Msg({
        type: 'error',
        message: msg,
        showClose: close
      })
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
