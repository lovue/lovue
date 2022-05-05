<script setup lang="ts">
import { ref } from 'vue'
import ComponentDemo from './ComponentDemo.vue'

const model1 = ref(false)
const model11 = ref(false)
const model12 = ref(false)
const model2 = ref(false)
const model4 = ref(false)
const model5 = ref(false)
const model6 = ref(false)
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
}

function confirmDialog11 () {
  throw 'error'
}

function confirmDialog12 () {
  return false
}

async function confirmDialog4 () {
  await sleep(1000)
  console.log('clicked OK')
}

async function confirmDialog5 () {
  await sleep(1000)
  throw 'wrong'
}

async function confirmDialog6 () {
  await sleep(1000)
  console.log('clicked OK')
  return false
}

async function sleep (delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}
</script>

<template>
  <ComponentDemo id="toDialog" title="LvDialog">
    <div class="usage">
      <pre><code>// types
export interface Props {
  modelValue?: boolean
  title?: string
  body?: string
  okText?: string
  cancelText?: string
  noFooter?: boolean
  simple?: boolean
  fixed?: boolean
  visible?: boolean
  class?: string
  confirm?: () => unknown // return false or throw error to not close the dialog.
}
const props = withDefaults(defineProps&lt;Props&gt;(), {
  okText: '确认',
  cancelText: '取消'
})
const emit = defineEmits(['update:modelValue'])
      </code></pre>
    </div>

    <div class="controls">
      <LvButton @click="model1 = true">Normal success</LvButton>
      <LvButton @click="model11 = true">Normal throw error</LvButton>
      <LvButton @click="model12 = true">Normal false</LvButton>
      <LvButton @click="model2 = true">No footer</LvButton>
      <LvButton @click="model4 = true">Async success</LvButton>
      <LvButton @click="model5 = true">Async throw error</LvButton>
      <LvButton @click="model6 = true">Async false</LvButton>

      <LvDialog v-model="model1" title="Test" :confirm="confirmDialog" class="custom-class">
        <p>Hello world</p>
      </LvDialog>

      <LvDialog v-model="model11" title="Test" :confirm="confirmDialog11" class="custom-class">
        <p>Hello world</p>
      </LvDialog>

      <LvDialog v-model="model12" title="Test" :confirm="confirmDialog12" class="custom-class">
        <p>Hello world</p>
      </LvDialog>

      <LvDialog v-model="model2" title="Test" no-footer visible>
        <p>Hello world</p>
        <LvSelect v-model="model3" :items="cars" />
      </LvDialog>

      <LvDialog v-model="model4" title="Test" :confirm="confirmDialog4" class="custom-class">
        <p>Hello world</p>
      </LvDialog>

      <LvDialog v-model="model5" title="Test" :confirm="confirmDialog5" class="custom-class">
        <p>Hello world</p>
      </LvDialog>

      <LvDialog v-model="model6" title="Test" :confirm="confirmDialog6" class="custom-class">
        <p>Hello world</p>
      </LvDialog>
    </div>
  </ComponentDemo>
</template>
