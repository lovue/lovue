import Message from './components/Message.vue'
import Modal from './components/Modal.vue'
import Button from './components/Button.vue'
import ButtonGroup from './components/ButtonGroup.vue'
import ButtonSend from './components/ButtonSend.vue'
import Checkbox from './components/Checkbox.vue'
import Col from './components/Col.vue'
import DatePicker from './components/DatePicker.vue'
import Icon from './components/Icon.vue'
import Input from './components/Input.vue'
import Menu from './components/Menu.vue'
import Pagination from './components/Pagination.vue'
import Popup from './components/Popup.vue'
import Progress from './components/Progress.vue'
import PureSelect from './components/PureSelect.vue'
import PwdStrength from './components/PwdStrength.vue'
import Radio from './components/Radio.vue'
import Row from './components/Row.vue'
import Search from './components/Search.vue'
import Select from './components/Select.vue'
import Steps from './components/Steps.vue'
import Switch from './components/Switch.vue'
import Tab from './components/Tab.vue'
import Upload from './components/Upload.vue'

if (!NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach
}

const Components = [
  Button,
  ButtonGroup,
  ButtonSend,
  Checkbox,
  Col,
  DatePicker,
  Icon,
  Input,
  Menu,
  Pagination,
  Popup,
  Progress,
  PureSelect,
  PwdStrength,
  Radio,
  Row,
  Search,
  Select,
  Steps,
  Switch,
  Tab,
  Upload
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
