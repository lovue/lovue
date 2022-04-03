<script setup lang="ts">
import { ref } from 'vue'
import ComponentDemo from './ComponentDemo.vue'
import LvSelect from '../src/components/LvSelect.vue'

const cars = [
  {
    text: '布加迪',
    value: 'Bugatti'
  },
  {
    text: '法拉利',
    value: 'Ferrari'
  },
  {
    text: '兰博基尼',
    value: 'Lamborghini',
    children: [
      { text: 'Aventador', value: 'Aventador' },
      { text: 'Sesto Elemento', value: 'SestoElemento' },
      { text: 'Veneno', value: 'Veneno' },
      { text: 'Veneno Roadster', value: 'Veneno Roadster' },
      { text: 'Urus', value: 'Urus' },
      { text: 'Huracan', value: 'Huracan' },
      { text: 'Huracan EVO SpyderHuracan EVO SpyderHuracan EVO Spyder', value: 'Huracan EVO Spyder' },
      { text: 'Reventon', value: 'Reventon' },
      { text: 'Gallardo', value: 'Gallardo' },
      { text: 'Murcielago', value: 'Murcielago' },
      { text: 'Diablo', value: 'Diablo' },
      { text: 'Asterion', value: 'Asterion' },
      { text: 'Estoque', value: 'Estoque' }
    ]
  },
  {
    text: '迈凯伦',
    value: 'McLaren'
  }
]

const model1 = ref('')
const model2 = ref('Ferrari')
const model3 = ref('Lamborghini')
const model4 = ref('Reventon')
const model5 = ref(['Ferrari', 'Bugatti'])
</script>

<template>
  <ComponentDemo id="toSelect" title="LvSelect">
    <div class="usage">
      <pre><code>// types
export interface OptionItem {
  text: string
  value: number | string | null
  children?: OptionItem[]
  disabled?: boolean
}

const props = withDefaults(defineProps&lt;{
  modelValue: string | number | [] | null
  items: OptionItem[]
  name?: string
  disabled?: boolean
  multiple?: boolean
  searchable?: boolean
  placeholder?: string
  searchPlaceholder?: string
  max?: number
  clearable?: boolean
  required?: boolean
}&gt;(), {
  placeholder: '请选择',
  searchPlaceholder: '搜索',
})
const emit = defineEmits(['update:modelValue', 'selected-items'])
      </code></pre>
    </div>

    <div class="controls">
      <LvSelect :items="cars" v-model="model1" />
      <LvSelect :items="cars" v-model="model2" searchable />
      <LvSelect :items="cars" v-model="model3" clearable />
      <LvSelect :items="cars" v-model="model4" />
    </div>
    <div class="controls">
      <LvSelect :items="cars" v-model="model5" multiple :max="3" />
    </div>
  </ComponentDemo>
</template>
