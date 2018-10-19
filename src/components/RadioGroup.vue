<template>
  <div class="v-radio-group">
    <label class="v-radio" v-for="item of source">
      <input type="radio" :value="item.value" v-model="checked" :name="name" :disabled="item.disabled">
      <span>{{item.name}}</span>
    </label>
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
      name: String
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
