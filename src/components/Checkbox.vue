<template>
  <label class="v-checkbox" :class="{reverse, disabled}">
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
      disabled: Boolean,
      reverse: Boolean
    },
    watch: {
      value(val) {
        this.checked = val
      }
    }
  }
</script>
