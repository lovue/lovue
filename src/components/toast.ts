import { render, h } from 'vue'
import LvToast, { Props, ToastType } from './LvToast.vue'

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

function getHandlerByType (type: ToastType) {
  return function (options: string | { text: string } | Props) {
    if (typeof options === 'string') options = { text: options }
    Toast({
      ...options,
      type
    })
  }
}

Toast.success = getHandlerByType('success')
Toast.info = getHandlerByType('info')
Toast.warn = getHandlerByType('warn')
Toast.error = getHandlerByType('error')

export default Toast
