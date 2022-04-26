import * as fs from 'fs'

const name = process.argv[2]

const componentTemplate = `<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{}>()
const emit = defineEmits([])
</script>

<template>
  <div class="lv-${name.toLowerCase()}">
  </div>
</template>

<style lang="less">
@import (reference) "../Mixins";
</style>
`

const demoTemplate = `<script setup lang="ts">
import ComponentDemo from './ComponentDemo.vue'
</script>

<template>
  <ComponentDemo id="to${name}" title="Lv${name}">
    <div class="usage">
      <pre><code>// types
const props = defineProps&lt;{}&gt;()
const emit = defineEmits([])
      </code></pre>
    </div>

    <div class="controls">
      <Lv${name} />
    </div>
  </ComponentDemo>
</template>
`

fs.writeFileSync(`src/extension/Lv${name}.vue`, componentTemplate)
fs.writeFileSync(`docs/Component${name}.vue`, demoTemplate)
