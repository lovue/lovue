import { render, h } from 'vue'
import LvDialog, { Props } from './LvDialog.vue'

export default function (options: Props) {
  const dialogNode = h(LvDialog, {
    ...options,
    modelValue: false,
    'onUpdate:modelValue' () {
      if (dialogNode.component) {
        dialogNode.component.props.modelValue = false

        setTimeout(() => {
          render(null, elem)
        }, 400)
      }
    }
  })
  const elem = document.createElement('div')

  render(dialogNode, elem)

  if (dialogNode.component) {
    dialogNode.component.props.modelValue = true
  }
}
