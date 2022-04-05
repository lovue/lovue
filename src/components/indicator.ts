import { VNode, render, h } from 'vue'
import Indicator from './Indicator.vue'

let app: VNode

export default {
  open () {
    if (!app) {
      app = h(Indicator)
      const elem = document.createElement('div')
      render(app, elem)
    }

    if (app.component) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      app.component.setupState.visible = true
    }
  },
  close () {
    if (app.component) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      app.component.setupState.visible = false
    }
  }
}
