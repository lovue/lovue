import Vue from 'vue'
import Message from './Message.vue'
import Modal from './Modal.vue'

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

const success = msg => Msg(msg)
const info = msg => {
  Msg({
    type: 'info',
    message: msg
  })
}
const warn = msg => {
  Msg({
    type: 'warn',
    message: msg
  })
}
const error = (msg, close) => {
  if (close === undefined) close = true

  Msg({
    type: 'error',
    message: msg.msg || msg,
    showClose: close
  })
}
const modal = function (option = {}) {
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

export { Msg, success, info, warn, error, modal }
