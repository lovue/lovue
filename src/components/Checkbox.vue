<template>
  <label class="v-checkbox">
    <input type="checkbox" :value="value" :name="name" :disabled="disabled">
    <span>{{label}}</span>
  </label>
</template>

<script>
  export default {
    name: 'v-checkbox',
    props: {
      value: [String, Number],
      label: String,
      name: String,
      disabled: Boolean
    }
  }
</script>
