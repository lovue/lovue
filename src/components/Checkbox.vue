<template>
  <label class="v-checkbox">
    <input type="checkbox" v-model="checked" :name="name" :disabled="disabled" @change="$emit('input', checked)">
    <span>{{label}}</span>
  </label>
</template>

<script>
  export default {
    name: 'v-checkbox',
    data() {
      return {
        checked: this.value
      }
    },
    props: {
      value: Boolean,
      label: String,
      name: String,
      disabled: Boolean
    }
  }
</script>
