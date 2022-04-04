<script setup lang="ts">
import { ref } from 'vue'
import ComponentDemo from './ComponentDemo.vue'

const model1 = ref(false)
const model2 = ref(false)
const model3 = ref(null)

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

function confirmDialog () {
  console.log('clicked OK')

  return true
}
</script>

<template>
  <ComponentDemo id="toDialog" title="LvDialog">
    <div class="usage">
      <pre><code>// types
const props = withDefaults(defineProps&lt;{
  modelValue: boolean
  title: string
  okText?: string
  cancelText?: string
  noFooter?: boolean
  confirm?: () => boolean
}&gt;(), {
  okText: '确认',
  cancelText: '取消'
})
const emit = defineEmits(['update:modelValue'])
      </code></pre>
    </div>

    <div class="controls">
      <LvButton @click="model1 = true">Open</LvButton>
      <LvButton @click="model2 = true">Open</LvButton>

      <LvDialog v-model="model1" title="Test" :confirm="confirmDialog">
        <p>Hello world</p>
      </LvDialog>

      <LvDialog v-model="model2" title="Test" no-footer>
        <p>Hello world</p>
        <LvSelect v-model="model3" :items="cars" />
      </LvDialog>
    </div>
  </ComponentDemo>
</template>
