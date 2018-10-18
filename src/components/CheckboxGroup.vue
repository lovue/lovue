<template>
  <div class="v-checkbox-group">
    <label class="v-checkbox" v-for="item of source">
      <input type="checkbox" :value="item.value" v-model="checked" :name="name" :disabled="item.disabled">
      <span>{{item.name}}</span>
    </label>
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
      name: String
    },
    watch: {
      checked(val) {
        this.$emit('input', val)
      }
    }
  }
</script>
