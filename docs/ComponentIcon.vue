<script setup lang="ts">
import ComponentDemo from './ComponentDemo.vue'
</script>

<template>
  <ComponentDemo id="toIcon" title="LvIcon">
    <a class="icons-preview" href="https://at.alicdn.com/t/project/712012/29ef13c1-c31f-45dd-8877-367b2b6c37a5.html" target="_blank">Icons Preview</a>
    <div class="usage">
      <pre><code>// types
const props = defineProps&lt;{
  icon: string
  size?: string
  cursor?: boolean
}&gt;()
defineEmits(['click'])
      </code></pre>
    </div>

    <div class="controls">
      <LvIcon icon="close" size="24" cursor />
    </div>
  </ComponentDemo>
</template>

<style lang="less" scoped>
.icons-preview {
  font-size: var(--big-font);
  color: var(--blue-color);
}
</style>
