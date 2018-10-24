<template>
  <div class="v-checkbox-group" :class="{vertical}">
    <div class="g-item" v-for="item of source">
      <label class="v-checkbox" :class="{reverse, disabled: item.disabled}">
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
      vertical: Boolean
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
