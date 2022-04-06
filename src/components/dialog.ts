import { render, h } from 'vue'
import LvDialog, { Props } from './LvDialog.vue'

export default function (options: Props) {
  const dialog = h(LvDialog, {
    ...options,
    modelValue: true,
    'onUpdate:modelValue' () {
      render(null, elem)
    }
  })
  const elem = document.createElement('div')

  render(dialog, elem)
}
