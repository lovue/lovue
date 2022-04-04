<script setup lang="ts">
import { ref } from 'vue'
import ComponentDemo from './ComponentDemo.vue'

const model1 = ref(null)
</script>

<template>
  <ComponentDemo id="toTooltip" title="LvTooltip">
    <div class="usage">
      <pre><code>// types
const props = defineProps&lt;{
  text: string
  width?: string | number
  position?: 'left' | 'right' | 'bottom' | undefined
}&gt;()
      </code></pre>
    </div>

    <div class="controls" style="align-items: center;">
      <LvTooltip text="这是提示这是提示内容这是提示内容这是提示内容内容" :width="100">提示在上面</LvTooltip>
      <LvTooltip text="这是提示内容" position="bottom">
        <LvButton>提示在下面</LvButton>
      </LvTooltip>
      <LvTooltip text="这是提示内容" position="left">
        <LvIcon icon="tip" />
      </LvTooltip>
      <LvTooltip text="这是提示内容" position="right">
        <LvInput v-model="model1" placeholder="提示在右边" />
      </LvTooltip>
    </div>
  </ComponentDemo>
</template>
