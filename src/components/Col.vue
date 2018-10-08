<template>
  <div class="v-col" :class="`col-${span}`">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'v-col',
    props: {
      span: Number
    }
  }
</script>
