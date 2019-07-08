import Vue from 'vue'
import options from './Indicator.vue'

let instance
const Indicator = Vue.extend(options)

export default {
  open() {
    if (!instance) {
      instance = new Indicator()
      instance.$mount()
      document.body.appendChild(instance.$el)
    }

    if (instance.visible) return
    instance.visible = true
  },
  close() {
    if (instance) instance.visible = false
  }
}


