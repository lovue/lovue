<template>
  <div class="vue-search">
    <input class="input" type="text" autocomplete="off" placeholder="关键词" @input="input">
    <svg class="icon-search">
      <use xlink:href="/static/platform/img/icons.svg#icon-search"></use>
    </svg>
  </div>
</template>
<script>
  let timer

  export default {
    components: {},
    methods: {
      input(ev) {
        if(timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          this.$emit('input', ev.target.value.trim())
        }, 300)
      }
    }
  }
</script>
