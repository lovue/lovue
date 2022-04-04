<script setup lang="ts">
import { ref } from 'vue'
import ComponentDemo from './ComponentDemo.vue'

const model1 = ref('2022-04-01')
const model2 = ref('')
</script>

<template>
  <ComponentDemo id="toDatePicker" title="LvDatePicker">
    <div class="usage">
      <pre><code>// types
interface Day {
  text: number
  month: number
}

const props = withDefaults(defineProps&lt;{
  modelValue: string
  name?: string
  minYear?: number
  maxYear?: number
  weeksText?: string[]
  monthsText?: string[]
}&gt;(), {
  minYear: 1950,
  maxYear: 2050,
  weeksText: () => ['日', '一', '二', '三', '四', '五', '六'],
  monthsText: () => ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
})
const emit = defineEmits(['update:modelValue'])
      </code></pre>
    </div>

    <div class="controls">
      <LvDatePicker v-model="model1" />
      <LvDatePicker v-model="model2" :min-year="2020" :max-year="2023" />
    </div>
  </ComponentDemo>
</template>
