<template>
  <label class="ant-checkbox">
    <input type="checkbox" class="ant-checkbox-input" :value="option.value" :name="name" :disabled="disabled">
    <span>{{option.label}}</span>
  </label>
</template>

<script>
  export default {
    name: 'v-checkbox',
    props: {
      option: Object,
      name: String,
      disabled: Boolean
    }
  }
</script>
