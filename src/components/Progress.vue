<template>
  <div class="v-progress" :style="style">
    <div class="layer-1"></div>
    <div class="layer-2" :style="`width:${progress}%; background-color: ${color}`"></div>
    <div class="layer-3">{{progress}}%</div>
  </div>
</template>
<script>
  export default {
    name: 'v-progress',
    data() {
      let style = {}
      this.width && (style.width = `${this.width}px`)
      if (this.height) {
        style.height = `${this.height}px`
        style.lineHeight = `${this.height}px`
      }

      return {
        style
      }
    },
    props: {
      value: Number,
      decimal: Boolean,
      type: String,
      width: Number,
      height: Number,
      color: String
    },
    computed: {
      progress() {
        if (this.decimal) {
          return Math.trunc(this.value * 10000) / 100
        } else {
          return this.value * 100 | 0
        }
      }
    }
  }
</script>
