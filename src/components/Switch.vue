<template>
  <label class="v-switch" :class="{disabled: disabled}">
    <input type="checkbox" :name="name" :checked="value" :disabled="disabled" @change="$emit('input', $event.target.checked)">
    <span></span>
  </label>
</template>

<script>
  export default {
    name: 'v-switch',
    props: {
      value: Boolean,
      name: String,
      disabled: Boolean
    }
  }
</script>
