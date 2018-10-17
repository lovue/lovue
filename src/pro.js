import Vue from 'vue'
import ImgReflex from './pro/ImgReflex.vue'
import SelectCity from './pro/SelectCity.vue'
import Collapse from './pro/Collapse.vue'
import HtmlEditor from './pro/HtmlEditor.vue'
// import Share from './pro/Share.vue'

const components = [
  ImgReflex,
  SelectCity,
  Collapse,
  HtmlEditor,
  // Share
]

components.forEach(component => {
  Vue.component(component.name, component)
})
