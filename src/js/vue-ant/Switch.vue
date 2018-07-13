<template>
  <label class="ant-switch">
    <input type="checkbox" class="ant-switch-input" :name="name" :disabled="disabled">
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
