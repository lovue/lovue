<template>
  <button class="v-btn" :class="customClass" :type="submit ? 'submit' : 'button'" :disabled="disabled" @click="click">
    <v-icon :icon="icon" v-if="!!icon && !loading"></v-icon>
    <v-icon icon="refresh" :class="{loading: loading}" v-if="loading"></v-icon>
    <slot></slot>
  </button>
</template>

<script>
  import Icon from './Icon.vue'

  export default {
    name: 'v-button',
    props: {
      type: String,
      size: String,
      disabled: Boolean,
      icon: String,
      loading: Boolean,
      submit: Boolean
    },
    components: {
      [Icon.name]: Icon
    },
    computed: {
      customClass() {
        let classes = `v-btn-${this.type || 'primary'}`
        this.size && (classes += ` v-btn-${this.size}`)
        return classes
      }
    },
    methods: {
      click() {
        if (this.loading) return
        this.$emit('click')
      }
    }
  }
</script>
