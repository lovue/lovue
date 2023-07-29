import { render, h } from 'vue'
import LvToast from './LvToast.vue'
import type { ToastType, ToastProps } from '../types'

function Toast (options: ToastProps) {
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
  return function (options: string | { text: string } | ToastProps) {
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
