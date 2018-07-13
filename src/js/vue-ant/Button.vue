<template>
  <button :type="type" :class="`ant-btn ${patternClass} ${sizeClass}`" :disabled="disabled" @click="click">
    <v-icon :icon="icon" v-if="!!icon && !loading"></v-icon>
    <v-icon icon="refresh" :class="{loading: loading}" v-if="loading"></v-icon>
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'v-button',
    data() {
      let patternClass = '', sizeClass = ''

      if (this.pattern === undefined) {
        patternClass = 'ant-btn-primary'
      } else {
        patternClass = `ant-btn-${this.pattern}`
      }

      if (this.size === 'small') sizeClass = 'ant-btn-sm'
      if (this.size === 'large') sizeClass = 'ant-btn-lg'

      return {
        patternClass,
        sizeClass
      }
    },
    props: {
      type: {
        type: String,
        'default': 'button'
      },
      pattern: String,
      size: String,
      disabled: Boolean,
      icon: String,
      loading: Boolean
    },
    methods: {
      click() {
        if (this.loading) return
        this.$emit('click')
      }
    }
  }
</script>
