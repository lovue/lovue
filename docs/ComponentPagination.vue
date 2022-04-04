<script setup lang="ts">
import ComponentDemo from './ComponentDemo.vue'

function update (info) {
  console.log(info)
}
</script>

<template>
  <ComponentDemo id="toPagination" title="LvPagination">
    <div class="usage">
      <pre><code>// types
const props = defineProps&lt;{}&gt;()
const emit = defineEmits([])
      </code></pre>
    </div>

    <div class="controls">
      <LvPagination :total="100" @update="update" />
    </div>
    <div class="controls">
      <LvPagination :total="100" theme="text" />
    </div>
    <div class="controls">
      <LvPagination :total="100" simple @update="update" />
    </div>
    <div class="controls">
      <LvPagination :total="100" theme="text" simple />
    </div>
  </ComponentDemo>
</template>
