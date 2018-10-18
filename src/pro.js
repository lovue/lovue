import Vue from 'vue'
import ImgReflex from './pro/ImgReflex.vue'
import SelectCity from './pro/SelectCity.vue'
import Collapse from './pro/Collapse.vue'
import HtmlEditor from './pro/HtmlEditor.vue'
import Tag from './pro/Tag.vue'

const components = [
  ImgReflex,
  SelectCity,
  Collapse,
  HtmlEditor,
  Tag
]

components.forEach(component => {
  Vue.component(component.name, component)
})
