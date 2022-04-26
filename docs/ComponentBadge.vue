<script setup lang="ts">
import ComponentDemo from './ComponentDemo.vue'
import { LvBadge } from '../src/index'
</script>

<template>
  <ComponentDemo id="toBadge" title="LvBadge">
    <div class="usage">
      <pre><code>// types
const props = defineProps&lt;{
  count?: string | number
  color?: string
}&gt;()
      </code></pre>
    </div>

    <div class="controls">
      <LvBadge>
        <LvIcon icon="bells" />
      </LvBadge>
      <LvBadge>邮件</LvBadge>
      <LvBadge :count="20" color="blue">
        <LvIcon icon="bells" />
      </LvBadge>
    </div>
  </ComponentDemo>
</template>
