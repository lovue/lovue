<template>
  <div class="vue-popup-window overlay" v-if="show">
    <div class="window-lv2">
      <div class="title-bar">
        <div class="title-name">{{title}}</div>
        <button class="btn-text btn-close" type="button" @click="close">
          <svg class="icon-close">
            <use xlink:href="/static/platform/img/icons.svg#icon-close"></use>
          </svg>
        </button>
      </div>
      <div class="win-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title: String,
      show: Boolean
    },
    watch: {
      show(val) {
        document.body.classList.toggle('overhidden', val)
      }
    },
    methods: {
      close() {
        this.$emit('close')
      }
    }
  }
</script>
