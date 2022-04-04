<script setup lang="ts">
import { ref } from 'vue'
import ComponentDemo from './ComponentDemo.vue'

const bindValue1 = ref('')
const bindValue2 = ref(100)
const bindValue3 = ref('')

function enter (value: string | number) {
  alert(value)
}
</script>

<template>
  <ComponentDemo id="toInput" title="LvInput">
    <div class="usage">
      <pre><code>// types
const props = defineProps&lt;{
  modelValue: string | number | null
  label?: string
  type?: string
  name?: string
  placeholder?: string
  pattern?: string
  required?: boolean
  disabled?: boolean
  focus?: boolean
  resize?: boolean
  readonly?: boolean
  vertical?: boolean
  step?: number
  min?: number
  max?: number
  minlength?: number
  maxlength?: number
}&gt;()
const emit = defineEmits(['update:modelValue', 'enter', 'blur'])
      </code></pre>
    </div>

    <div class="controls">
      <LvInput
        placeholder="Please input something"
        name="username"
        label="username"
        :minlength="2"
        :maxlength="5"
        v-model="bindValue1"
        @enter="enter"
      />
      <LvInput
        v-model="bindValue3"
        placeholder="resize"
        resize
        label="nickname"
        vertical
      />
      <LvInput v-model="bindValue1" disabled />
      <LvInput v-model="bindValue1" readonly />
      <LvInput v-model="bindValue2" type="number" :step="2" :min="0" :max="110" />
    </div>
  </ComponentDemo>
</template>
