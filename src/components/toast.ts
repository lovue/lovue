import { render, h } from 'vue'
import LvToast, { Props } from './LvToast.vue'

type NoTypeProps = Omit<Props, 'type'>

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

Toast.success = function (options: NoTypeProps) {
  Toast({
    ...options,
    type: 'success'
  })
}

Toast.info = function (options: NoTypeProps) {
  Toast({
    ...options,
    type: 'info'
  })
}

Toast.warn = function (options: NoTypeProps) {
  Toast({
    ...options,
    type: 'warn'
  })
}

Toast.error = function (options: NoTypeProps) {
  Toast({
    ...options,
    type: 'error'
  })
}

export default Toast
