import { render, h } from 'vue'
import LvToast, { Props } from './LvToast.vue'

function Toast (options: Props) {
  const toastNode = h(LvToast, {
    ...options,
    onClose () {
      render(null, elem)
    }
  })
  const elem = document.createElement('div')

  render(toastNode, elem)
}

Toast.success = function (options: Props) {
  Toast({
    ...options,
    type: 'success'
  })
}

Toast.info = function (options: Props) {
  Toast({
    ...options,
    type: 'info'
  })
}

Toast.warn = function (options: Props) {
  Toast({
    ...options,
    type: 'warn'
  })
}

Toast.error = function (options: Props) {
  Toast({
    ...options,
    type: 'error'
  })
}

export default Toast
