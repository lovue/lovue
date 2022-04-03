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
  { text: 'all', value: null }
]
const items4 = [
  { text: 'all', value: null, disabled: true }
]

const model1 = ref('vue')
const model12 = ref('angular')
const model2 = ref(300)
const model22 = ref(200)
const model3 = ref(['vue', 'react'])
const model32 = ref(['vue', 'angular'])
const model4 = ref([100, 300])
const model42 = ref([200, 300])
const model5 = ref(true)
const model6 = ref(false)
</script>

<template>
  <ComponentDemo id="toOptions" title="LvOptions">
    <div class="usage">
      <pre><code>// types
export interface OptionItem {
  text: string
  value: number | string | null
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
      <LvOptions type="radio" :items="items1" v-model="model12" reverse />
      <LvOptions type="radio" :items="items1" v-model="model12" vertical />
      <LvOptions type="radio" :items="items1" v-model="model1" vertical reverse />
    </div>
    <div class="controls">
      <div class="option-value">{{ model2 }}</div>
      <LvOptions type="radio" :items="items2" v-model="model2" shape="button" />
      <LvOptions type="radio" :items="items2" v-model="model22" shape="button" vertical />
    </div>
    <div class="controls">
      <div class="option-value">{{ model3 }}</div>
      <LvOptions type="checkbox" :items="items1" name="lib" v-model="model3" />
      <LvOptions type="checkbox" :items="items1" v-model="model32" reverse />
      <LvOptions type="checkbox" :items="items1" v-model="model3" vertical />
      <LvOptions type="checkbox" :items="items1" v-model="model32" vertical reverse />
    </div>
    <div class="controls">
      <div class="option-value">{{ model4 }}</div>
      <LvOptions type="checkbox" :items="items2" v-model="model4" shape="button" />
      <LvOptions type="checkbox" :items="items2" v-model="model42" shape="button" vertical />
    </div>
    <div class="controls">
      <div class="option-value">{{ model5 }}</div>
      <LvOptions type="checkbox" :items="items3" name="all" v-model="model5" />
      <LvOptions type="checkbox" :items="items3" name="all" v-model="model5" reverse />
      <LvOptions type="checkbox" :items="items3" name="all" v-model="model5" shape="button" />
    </div>
    <div class="controls">
      <div class="option-value">{{ model5 }}</div>
      <LvOptions type="switch" :items="items3" name="all" v-model="model5" />
      <LvOptions type="switch" :items="items3" name="all" v-model="model5" reverse />
      <LvOptions
        type="switch"
        :items="items3"
        name="all"
        v-model="model5"
        reverse
        shape="button"
      />
      <LvOptions type="switch" :items="items4" name="all" v-model="model5" />
      <LvOptions type="switch" :items="items4" name="all" v-model="model6" />
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
