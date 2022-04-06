import { VNode, render, h } from 'vue'
import LvIndicator from './LvIndicator.vue'

let indicator: VNode

export default {
  open () {
    if (!indicator) {
      indicator = h(LvIndicator)
      const elem = document.createElement('div')
      render(indicator, elem)
    }

    if (indicator.component) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      indicator.component.setupState.visible = true
    }
  },
  close () {
    if (indicator.component) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      indicator.component.setupState.visible = false
    }
  }
}
