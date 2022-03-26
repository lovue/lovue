<script setup lang="ts">
import { ref } from 'vue'
import ComponentDemo from './ComponentDemo.vue'

const items1 = [
  { text: 'Vue', icon: 'heart' },
  { text: 'React', icon: 'setting' },
  { text: 'Angular', icon: 'home' }
]
const items2 = ['Tesla', 'XiaoPeng', 'WeiLai']

const currentIndex = ref(1)
</script>

<template>
  <ComponentDemo id="toTabs" title="LvTabs">
    <div class="usage">
      <pre><code>// types
export interface TabItem {
  text?: string
  icon?: string
}

type ItemType = TabItem | string | number

const props = defineProps&lt;{
  modelValue: number
  items: ItemType[]
  locked?: boolean
}&gt;()
const emit = defineEmits(['update:modelValue'])
      </code></pre>
    </div>

    <div class="controls">
      <LvTabs :items="items1" v-model="currentIndex" />
      <LvTabs :items="items2" v-model="currentIndex" locked />
    </div>
  </ComponentDemo>
</template>
