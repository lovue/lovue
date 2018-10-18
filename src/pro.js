import Vue from 'vue'
import ImgReflex from './pro/ImgReflex.vue'
import SelectCity from './pro/SelectCity.vue'
import Collapse from './pro/Collapse.vue'
import HtmlEditor from './pro/HtmlEditor.vue'
import Tags from './pro/Tags.vue'

const components = [
  ImgReflex,
  SelectCity,
  Collapse,
  HtmlEditor,
  Tags
]

components.forEach(component => {
  Vue.component(component.name, component)
})
