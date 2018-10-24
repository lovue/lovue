<template>
  <div class="v-search">
    <v-input :placeholder="placeholder || '关键词'" @input="inputHandler"></v-input>
    <v-icon icon="search" @click.native="$emit('search', keywords)"></v-icon>
  </div>
</template>

<script>
  let timer

  export default {
    name: 'v-search',
    props: {
      auto: {
        type: Boolean,
        'default': true
      },
      placeholder: String,
      delay: {
        type: Number,
        'default': 500
      }
    },
    methods: {
      inputHandler(text) {
        if (!this.auto) return

        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          this.$emit('search', text)
        }, this.delay)
      }
    }
  }
</script>
