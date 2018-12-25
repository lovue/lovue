<template>
  <div class="v-input" :class="{effect: effect}">
    <div class="hidden-value" v-if="resize">{{content}}</div>
    <input class="input" :style="`min-width: ${width}px;`" :type="type" :name="name" v-model="content" :step="step" :min="min" :max="max"
           :placeholder="placeholder" :required="required" autocomplete="off" :disabled="disabled" :readonly="readonly"
           @keypress.enter="pressEnter">
    <hr v-if="effect">
  </div>
</template>

<script>
  export default {
    name: 'v-input',
    data() {
      return {
        width: this.resize ? 0 : undefined,
        content: this.value
      }
    },
    props: {
      value: [String, Number],
      effect: Boolean,
      type: String,
      name: String,
      placeholder: String,
      required: Boolean,
      disabled: Boolean,
      step: String,
      min: String,
      max: String,
      focus: Boolean,
      resize: Boolean,
      readonly: Boolean
    },
    watch: {
      value(val) {
        this.content = val
      },
      content(val) {
        this.resize && this.updateSize()
        this.$emit('input', val)
      }
    },
    methods: {
      async updateSize() {
        await this.$nextTick()
        this.width = this.$el.querySelector('.hidden-value').offsetWidth
      },
      pressEnter(ev) {
        this.$emit('enter', ev.target.value)
      }
    },
    mounted() {
      this.focus && this.$el.querySelector('input').focus()
    }
  }
</script>
