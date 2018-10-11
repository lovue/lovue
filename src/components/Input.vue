<template>
  <div class="v-input" :class="{effect: effect}">
    <input :type="type" :name="name" :value="value" @input="$emit('input', $event.target.value)" :placeholder="placeholder">
    <hr v-if="effect">
  </div>
</template>

<script>
  export default {
    name: 'v-input',
    props: {
      value: [String, Number],
      effect: Boolean,
      type: String,
      name: String,
      placeholder: String
    }
  }
</script>
