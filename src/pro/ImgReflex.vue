<template>
  <div class="v-img-reflex">
    <div class="img-wrap">
      <img :src="src" :alt="alt">
    </div>
    <div class="reflex-wrap">
      <div class="reflex"></div>
      <div class="reflex-gradient"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-img-reflex',
  props: {
    src: String,
    alt: String
  },
  mounted() {
    this.$el.querySelector('.reflex-wrap .reflex').style.backgroundImage = `url(${this.src})`
  }
}
</script>
