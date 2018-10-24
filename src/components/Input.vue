<template>
  <div class="v-input" :class="{effect: effect}">
    <input class="input" :type="type" :name="name" :value="value" :step="step" :min="min" :max="max" @input="$emit('input', $event.target.value)"
           :placeholder="placeholder" :required="required" autocomplete="off">
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
      placeholder: String,
      required: Boolean,
      step: String,
      min: String,
      max: String,
      focus: Boolean
    },
    mounted() {
      this.focus && this.$el.querySelector('input').focus()
    }
  }
</script>
