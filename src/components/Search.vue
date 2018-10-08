<template>
  <div class="v-search">
    <input class="v-input" autocomplete="off" :placeholder="placeholder" @input="inputHandler" v-model.trim="keywords">
    <v-icon icon="search" @click.native="$emit('input', keywords)"></v-icon>
  </div>
</template>

<script>
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
      placeholder: {
        type: String,
        'default': '关键词'
      }
    },
    methods: {
      inputHandler(ev) {
        if (!this.auto) return

        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          this.$emit('input', ev.target.value.trim())
        }, 300)
      }
    }
  }
</script>

<style scoped>

</style>
