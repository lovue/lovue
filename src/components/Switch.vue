<template>
  <label class="v-switch" :class="{disabled: disabled}">
    <input type="checkbox" :name="name" v-model="checked" :disabled="disabled" @change="toggle">
    <span></span>
  </label>
</template>

<script>
  export default {
    name: 'v-switch',
    data() {
      return {
        checked: Boolean(this.value)
      }
    },
    props: {
      value: [Boolean, Number],
      name: String,
      disabled: Boolean
    },
    watch: {
      value(val) {
        this.checked = Boolean(val)
      }
    },
    methods: {
      toggle() {
        const result = typeof this.value === 'number' ? Number(this.checked) : this.checked
        this.$emit('input', result)
      }
    }
  }
</script>
