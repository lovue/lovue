import { VNode, render, h } from 'vue'
import LvIndicator from './LvIndicator.vue'

let indicatorNode: VNode

export default {
  open () {
    if (!indicatorNode) {
      indicatorNode = h(LvIndicator)
      const elem = document.createElement('div')
      render(indicatorNode, elem)
    }

    if (indicatorNode.component) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      indicatorNode.component.setupState.visible = true
    }
  },
  close () {
    if (indicatorNode.component) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      indicatorNode.component.setupState.visible = false
    }
  }
}
