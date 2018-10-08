<template>
  <label class="v-switch" :class="{disabled: disabled}">
    <input type="checkbox" :name="name" :disabled="disabled">
    <span></span>
  </label>
</template>

<script>
  export default {
    name: 'v-switch',
    props: {
      name: String,
      disabled: Boolean
    }
  }
</script>
