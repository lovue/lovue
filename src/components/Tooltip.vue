<template>
  <div class="v-tooltip" :class="posClass" :aria-label="text"><slot></slot></div>
</template>

<script>
  export default {
    name: 'v-tooltip',
    props: {
      pos: String,
      text: String
    },
    computed: {
      posClass() {
        return this.pos ? `pos-${this.pos}` : ''
      }
    }
  }
</script>
