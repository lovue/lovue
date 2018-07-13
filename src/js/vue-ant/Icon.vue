<template>
  <svg :class="`icon icon-${icon}`" :width="size" :height="size"><use :xlink:href="`#icon-${icon}`"></use></svg>
</template>
<script>
  export default {
    name: 'v-icon',
    props: {
      icon: String,
      size: {
        type: String,
        'default': '20'
      }
    }
  }
</script>
