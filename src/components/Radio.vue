<template>
  <label class="v-radio" :class="{reverse, disabled}">
    <input type="radio" :value="value" :name="name" :disabled="disabled">
    <span>{{label}}</span>
  </label>
</template>

<script>
  import '../less/components/Radio.less'

  export default {
    name: 'v-radio',
    props: {
      value: [String, Number],
      label: String,
      name: String,
      disabled: Boolean,
      reverse: Boolean
    }
  }
</script>
