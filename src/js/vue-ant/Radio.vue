<template>
  <label class="ant-radio">
    <input type="radio" class="ant-radio-input" :value="option.value" :name="name" :disabled="disabled">
    <span>{{option.label}}</span>
  </label>
</template>

<script>
  export default {
    name: 'v-radio',
    props: {
      option: Object,
      name: String,
      disabled: Boolean
    }
  }
</script>
