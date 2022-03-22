<script setup lang="ts">
import { ref } from 'vue'
import ComponentDemo from './ComponentDemo.vue'

const items1 = [
  { text: 'Vue', value: 'vue' },
  { text: 'Angular', value: 'angular', disabled: true },
  { text: 'React', value: 'react' }
]

const items2 = [
  { text: '100', value: 100 },
  { text: '200', value: 200, disabled: true },
  { text: '300', value: 300 }
]

const model1 = ref('vue')
const model2 = ref(300)
</script>

<template>
  <ComponentDemo id="toRadios" title="LvRadios">
    <div class="usage">
      <pre><code>// Props
  modelValue: number | string
  items: RadioItem[]
  name?: string,
  reverse?: boolean
  vertical?: boolean
  shape?: 'button' | undefined
      </code></pre>
    </div>

    <div class="controls">
      <LvRadios :items="items1" name="framework" v-model="model1" />
      <LvRadios :items="items1" v-model="model1" reverse />
      <LvRadios :items="items1" v-model="model1" vertical />
      <LvRadios :items="items1" v-model="model1" vertical reverse />
      <LvRadios :items="items2" v-model="model2" shape="button" />
      <LvRadios :items="items2" v-model="model2" shape="button" vertical />
    </div>
  </ComponentDemo>
</template>
