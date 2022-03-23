<script setup lang="ts">
import ComponentDemo from './ComponentDemo.vue'

function search (text: string) {
  alert(text)
}
</script>

<template>
  <ComponentDemo id="toSearch" title="LvSearch">
    <div class="usage">
      <pre><code>// types
const props = withDefaults(defineProps&lt;{
  placeholder?: string
  auto?: boolean
  delay?: number
}&gt;(), {
  placeholder: '关键词',
  auto: true,
  delay: 500
})
const emit = defineEmits(['search'])
      </code></pre>
    </div>

    <div class="controls">
      <LvSearch @search="search" placeholder="auto search" />
      <LvSearch @search="search" placeholder="click icon to search" :auto="false" />
    </div>
  </ComponentDemo>
</template>
