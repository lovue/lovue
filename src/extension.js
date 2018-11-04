import Vue from 'vue'
import ImgReflex from './extension/ImgReflex.vue'
import SelectCity from './extension/SelectCity.vue'
import Collapse from './extension/Collapse.vue'
import HtmlEditor from './extension/HtmlEditor.vue'
import Tag from './extension/Tag.vue'

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
