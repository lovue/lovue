<template>
  <svg :class="`icon icon-${icon}`" :width="size || 20" :height="size || 20" @click="$emit('click')"><use :xlink:href="`#icon-${icon}`"></use></svg>
</template>
<script>
  import '../less/components/Icon.less'

  export default {
    name: 'v-icon',
    props: {
      icon: String,
      size: String
    }
  }
</script>
