<script setup lang="ts">
import ComponentDemo from './ComponentDemo.vue'
import { Pagination } from '../src/components/LvPagination.vue'

function update (info: Pagination) {
  console.log(info)
}
</script>

<template>
  <ComponentDemo id="toPagination" title="LvPagination">
    <div class="usage">
      <pre><code>// types
export interface Pagination {
  index: number
  pageSize: number
}

const props = withDefaults(defineProps&lt;{
  total: number
  pageSize?: number
  sizeOptions?: number[]
  simple?: boolean
  theme?: 'ghost' | 'text'
}&gt;(), {
  pageSize: 10,
  sizeOptions: () => [10, 20, 50],
  theme: 'ghost'
})
const emit = defineEmits(['update'])
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
