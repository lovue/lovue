<script setup lang="ts">
import { ref } from 'vue'
import ComponentDemo from './ComponentDemo.vue'

const loading1 = ref(false)
const loading2 = ref(false)
</script>

<template>
  <ComponentDemo id="toButton" title="LvButton">
    <div class="usage">
      <pre><code>// Props
  type?: 'submit' | 'reset' | undefined
  theme?: 'ghost' | 'text' | undefined
  size?: 'lg' | 'sm' | undefined
  disabled?: boolean
  icon?: string
  loading?: boolean
  submit?: boolean

// Emit
  click
      </code></pre>
    </div>

    <div class="controls">
      <LvButton>Default</LvButton>
      <LvButton type="submit">Submit Button</LvButton>
      <LvButton theme="ghost">Ghost Button</LvButton>
      <LvButton theme="danger">Danger Button</LvButton>
      <LvButton theme="text">Text Button</LvButton>
      <LvButton disabled>Disabled Button</LvButton>
    </div>
    <div class="controls">
      <LvButton size="lg">Large Button</LvButton>
      <LvButton>Normal Button</LvButton>
      <LvButton size="sm">Small Button</LvButton>
    </div>
    <div class="controls">
      <LvButton icon="download" theme="ghost">Ghost Download Button</LvButton>
      <LvButton icon="download" theme="ghost">Ghost Download Button</LvButton>
      <LvButton icon="download" theme="danger">Danger Download Button</LvButton>
    </div>
    <div class="controls">
      <LvButton loading>Loading Button</LvButton>
      <LvButton loading />
      <LvButton :loading="loading1" icon="download" @click="loading1 = !loading1">Click to loading</LvButton>
      <LvButton :loading="loading2" @click="loading2 = !loading2">Click to loading</LvButton>
    </div>
  </ComponentDemo>
</template>

<style lang="less" scoped>
</style>
