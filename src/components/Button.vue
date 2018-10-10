<template>
  <button :type="type" :class="`v-btn ${theme} ${size}`" :disabled="disabled" @click="click">
    <v-icon :icon="icon" v-if="!!icon && !loading"></v-icon>
    <v-icon icon="refresh" :class="{loading: loading}" v-if="loading"></v-icon>
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'v-button',
    data() {
      return {
        type: this.submit ? 'submit' : 'button',
        theme: `v-btn-${this.type}`,
        size: `v-btn-${this.size}`
      }
    },
    props: {
      type: {
        type: String,
        'default': 'primary'
      },
      size: String,
      disabled: Boolean,
      icon: String,
      loading: Boolean,
      submit: Boolean
    },
    methods: {
      click() {
        if (this.loading) return
        this.$emit('click')
      }
    }
  }
</script>
