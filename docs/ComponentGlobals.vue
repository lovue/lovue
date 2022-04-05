<script setup lang="ts">
import ComponentDemo from './ComponentDemo.vue'

function startFetch () {
  window.Indicator.open()

  setTimeout(() => {
    window.Indicator.close()
  }, 1000)
}
</script>

<template>
  <ComponentDemo id="toGlobals" title="Globals">
    <div class="usage">
      <pre><code>// call
window.Indicator.open()
window.Indicator.close()
      </code></pre>
    </div>

    <div class="controls">
      <LvButton @click="startFetch">Indicator</LvButton>
    </div>
  </ComponentDemo>
</template>
