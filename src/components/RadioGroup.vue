<template>
  <div class="v-radio-group" :class="{vertical}">
    <div class="g-item" v-for="item of source">
      <label :class="{[lnfClass]: true, reverse, disabled: item.disabled}">
        <input type="radio" :value="item.value" v-model="checked" :name="name" :disabled="item.disabled">
        <span>{{item.name}}</span>
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-radio-group',
    data() {
      return {
        checked: this.value
      }
    },
    props: {
      value: [Number, String, Boolean],
      source: Array,
      name: String,
      reverse: Boolean,
      vertical: Boolean,
      lnf: String
    },
    computed: {
      lnfClass() {
        return this.lnf === undefined ? 'v-radio' : `v-radio-${this.lnf}`
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
