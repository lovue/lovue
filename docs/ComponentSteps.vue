<script setup lang="ts">
import { ref } from 'vue'
import ComponentDemo from './ComponentDemo.vue'
import { LvSteps } from '../src/index'

const currentStep = ref(0)
const steps1 = [
  { text: '第一步', icon: 'heart' },
  { text: '第二步', icon: 'heart' },
  { text: '第三步', icon: 'heart' }
]
const steps2 = [
  { text: '第一步' },
  { text: '第二步' },
  { text: '第三步' }
]
const steps3 = [
  { icon: 'heart' },
  { icon: 'heart' },
  { icon: 'heart' }
]

function prev () {
  if (currentStep.value === 0) return
  currentStep.value--
}

function next () {
  if (currentStep.value === steps1.length) return
  currentStep.value++
}
</script>

<template>
  <ComponentDemo id="toSteps" title="LvSteps">
    <div class="usage">
      <pre><code>// types
export interface StepItem {
  text?: string
  icon?: string
}

const props = defineProps&lt;{
  items: StepItem[]
  cur: number
}&gt;()
      </code></pre>
    </div>

    <div class="controls">
      <LvSteps :items="steps1" :cur="currentStep" style="flex: 1;" />
    </div>
    <div class="controls">
      <LvSteps :items="steps2" :cur="currentStep" style="flex: 1;" />
    </div>
    <div class="controls">
      <LvSteps :items="steps3" :cur="currentStep" style="flex: 1;" />
    </div>
    <div class="controls">
      <LvButton @click="prev">Previous Step</LvButton>
      <LvButton @click="next">Next Step</LvButton>
    </div>
  </ComponentDemo>
</template>
