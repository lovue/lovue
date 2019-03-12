import Collapse from './extension/Collapse.vue'
import HtmlEditor from './extension/HtmlEditor.vue'
import ImgReflex from './extension/ImgReflex.vue'
import SelectCity from './extension/SelectCity.vue'
import Step from './extension/Step.vue'
import Tag from './extension/Tag.vue'

const install = function (Vue) {
  if (!Vue || install.installed) return

  const Components = [
    Collapse,
    HtmlEditor,
    ImgReflex,
    SelectCity, Step,
    Tag
  ]

  Components.forEach(c => Vue.component(c.name, c))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  Collapse,
  HtmlEditor,
  ImgReflex,
  SelectCity, Step,
  Tag
}

export default { install }
