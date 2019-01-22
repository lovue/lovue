<template>
  <div class="v-search">
    <v-input :placeholder="placeholder || '关键词'" @input="inputHandler"></v-input>
    <v-icon icon="search" @click.native="$emit('search', keywords)"></v-icon>
  </div>
</template>

<script>
  import Icon from './Icon.vue'
  import Input from './Input.vue'

  let timer

  export default {
    name: 'v-search',
    data() {
      return {
        keywords: ''
      }
    },
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
    components: {
      [Icon.name]: Icon,
      [Input.name]: Input
    },
    methods: {
      inputHandler(text) {
        this.keywords = text

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
