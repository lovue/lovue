import Collapse from './extension/Collapse.vue'
import HtmlEditor from './extension/HtmlEditor.vue'
import ImgReflex from './extension/ImgReflex.vue'
import SelectCity from './extension/SelectCity.vue'
import Step from './extension/Step.vue'
import Tag from './extension/Tag.vue'

if (typeof window !== 'undefined' && window.Vue) {
  const components = [
    Collapse,
    HtmlEditor,
    ImgReflex,
    SelectCity, Step,
    Tag
  ]

  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  Collapse,
  HtmlEditor,
  ImgReflex,
  SelectCity, Step,
  Tag
}
