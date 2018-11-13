<template>
  <div class="v-checkbox-group" :class="{vertical}">
    <div class="g-item" v-for="item of source">
      <label :class="{[lnfClass]: true, reverse, disabled: item.disabled}">
        <input type="checkbox" :value="item.value" v-model="checked" :name="name" :disabled="item.disabled">
        <span>{{item.name}}</span>
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-checkbox-group',
    data() {
      return {
        checked: this.value
      }
    },
    props: {
      value: Array,
      source: Array,
      name: String,
      reverse: Boolean,
      vertical: Boolean,
      lnf: String
    },
    computed: {
      lnfClass() {
        return this.lnf === undefined ? 'v-checkbox' : `v-checkbox-${this.lnf}`
      }
    },
    watch: {
      value(val) {
        this.checked = val
      },
      checked(val) {
        this.$emit('input', val)
      }
    }
  }
</script>
