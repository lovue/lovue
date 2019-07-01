<template>
  <label :class="{[lnfClass]: true, reverse, disabled}">
    <input type="checkbox" v-model="checked" :name="name" :disabled="disabled" @change="toggle">
    <span>{{label}}</span>
  </label>
</template>

<script>
  import '../less/components/Checkbox.less'

  export default {
    name: 'v-checkbox',
    data() {
      return {
        checked: Boolean(this.value)
      }
    },
    props: {
      value: [Boolean, Number],
      label: String,
      name: String,
      disabled: Boolean,
      reverse: Boolean,
      lnf: String
    },
    computed: {
      lnfClass() {
        return this.lnf === undefined ? 'v-checkbox' : `v-checkbox-${this.lnf}`
      }
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
