<template>
  <div class="v-tooltip" :class="customClass" :aria-label="text"><slot></slot></div>
</template>

<script>
  export default {
    name: 'v-tooltip',
    props: {
      pos: String,
      text: String,
      width: [Number, String]
    },
    computed: {
      customClass() {
        let str = this.pos ? `pos-${this.pos}` : ''
        if (this.width) str += ' t-width-limited'
        return str
      }
    },
    mounted() {
      let {width} = this
      if (width) {
        width = typeof width === 'string' ? width : `${width}px`
        this.$el.style.setProperty('--content-width', width)
      }
    }
  }
</script>
