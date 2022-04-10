import { render, h } from 'vue'
import LvDialog, { Props } from './LvDialog.vue'

export default function (options: Props) {
  const dialog = h(LvDialog, {
    ...options,
    modelValue: false,
    'onUpdate:modelValue' () {
      if (dialog.component) {
        dialog.component.props.modelValue = false

        setTimeout(() => {
          render(null, elem)
        }, 400)
      }
    }
  })
  const elem = document.createElement('div')

  render(dialog, elem)

  if (dialog.component) {
    dialog.component.props.modelValue = true
  }
}
