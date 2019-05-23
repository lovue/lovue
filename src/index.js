import Button from './components/Button.vue'
import ButtonGroup from './components/ButtonGroup.vue'
import ButtonSend from './components/ButtonSend.vue'
import Checkbox from './components/Checkbox.vue'
import CheckboxGroup from './components/CheckboxGroup.vue'
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
import RadioGroup from './components/RadioGroup.vue'
import Row from './components/Row.vue'
import Search from './components/Search.vue'
import Select from './components/Select.vue'
import Switch from './components/Switch.vue'
import Tab from './components/Tab.vue'
import Table from './components/Table.vue'
import Tooltip from './components/Tooltip.vue'
import Upload from './components/Upload.vue'
import {Msg, success, info, warn, error, modal} from './components/prototypes'

const install = function (Vue) {
  if (!Vue || install.installed) return

  const Components = [
    Button, ButtonGroup, ButtonSend,
    Checkbox, CheckboxGroup, Col,
    DatePicker,
    Icon, Input,
    Menu,
    Pagination, Popup, Progress, PureSelect, PwdStrength,
    Radio, RadioGroup, Row,
    Search, Select, Switch,
    Tab, Table, Tooltip,
    Upload
  ]

  Components.forEach(c => Vue.component(c.name, c))

  Vue.prototype.msg = Msg
  Vue.prototype.success = success
  Vue.prototype.info = info
  Vue.prototype.warn = warn
  Vue.prototype.error = error
  Vue.prototype.modal = modal
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  Button, ButtonGroup, ButtonSend,
  Checkbox, CheckboxGroup, Col,
  DatePicker,
  Icon, Input,
  Menu,
  Pagination, Popup, Progress, PureSelect, PwdStrength,
  Radio, RadioGroup, Row,
  Search, Select, Switch,
  Tab, Table, Tooltip,
  Upload,
  Msg, success, info, warn, error, modal
}

export default { install }
