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

const items3 = [
  { text: 'all', value: undefined }
]

const model1 = ref('vue')
const model2 = ref(300)
const model3 = ref(['vue', 'angular'])
const model4 = ref([300])
const model5 = ref(true)
</script>

<template>
  <ComponentDemo id="toOptions" title="LvOptions">
    <div class="usage">
      <pre><code>
interface OptionItem {
  text: string
  value: number | string | undefined
  disabled?: boolean
}

const props = defineProps&lt;{
  type: 'radio' | 'checkbox'
  modelValue: number | string | boolean | []
  items: OptionItem[]
  name?: string,
  reverse?: boolean
  vertical?: boolean
  shape?: 'button' | undefined
}&gt;()
const emit = defineEmits(['update:modelValue'])
      </code></pre>
    </div>

    <div class="controls">
      <div class="option-value">{{ model1 }}</div>
      <LvOptions type="radio" :items="items1" name="framework" v-model="model1" />
      <LvOptions type="radio" :items="items1" v-model="model1" reverse />
      <LvOptions type="radio" :items="items1" v-model="model1" vertical />
      <LvOptions type="radio" :items="items1" v-model="model1" vertical reverse />
    </div>
    <div class="controls">
      <div class="option-value">{{ model2 }}</div>
      <LvOptions type="radio" :items="items2" v-model="model2" shape="button" />
      <LvOptions type="radio" :items="items2" v-model="model2" shape="button" vertical />
    </div>
    <div class="controls">
      <div class="option-value">{{ model3 }}</div>
      <LvOptions type="checkbox" :items="items1" name="lib" v-model="model3" />
      <LvOptions type="checkbox" :items="items1" v-model="model3" reverse />
      <LvOptions type="checkbox" :items="items1" v-model="model3" vertical />
      <LvOptions type="checkbox" :items="items1" v-model="model3" vertical reverse />
    </div>
    <div class="controls">
      <div class="option-value">{{ model4 }}</div>
      <LvOptions type="checkbox" :items="items2" v-model="model4" shape="button" />
      <LvOptions type="checkbox" :items="items2" v-model="model4" shape="button" vertical />
    </div>
    <div class="controls">
      <div class="option-value">{{ model5 }}</div>
      <LvOptions type="checkbox" :items="items3" name="all" v-model="model5" />
      <LvOptions type="checkbox" :items="items3" name="all" v-model="model5" reverse />
      <LvOptions type="checkbox" :items="items3" name="all" v-model="model5" shape="button" />
    </div>
  </ComponentDemo>
</template>

<style lang="less" scoped>
.option-value {
  width: 240px;
  color: var(--error-color);
  font-weight: 500;
}
</style>
