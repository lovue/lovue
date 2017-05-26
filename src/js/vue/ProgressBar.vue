<template>
  <div class="vue-progress-bar">
    <div class="layer-1"></div>
    <div class="layer-2" :style="`width:${progress}%`"></div>
    <div class="layer-3">{{progress}}%</div>
  </div>
</template>
<script>
  export default {
    props: {
      value: Number,
      decimal: Boolean
    },
    computed: {
      progress() {
        if (this.decimal) {
          return this.value * 100
        } else {
          return this.value * 100 | 0
        }
      }
    }
  }
</script>
