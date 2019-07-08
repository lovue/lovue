<template>
  <div class="v-badge">
    <v-icon :icon="icon" v-if="icon"></v-icon>
    <span class="b-text" v-else>{{text}}</span>
    <span class="b-count" :data-count="count" :style="countStyle">{{count}}</span>
  </div>
</template>

<script>
  import Icon from './Icon.vue'
  import '../less/components/Badge.less'

  export default {
    name: 'v-badge',
    props: {
      icon: String,
      text: String,
      count: [String, Number],
      color: String
    },
    components: {
      [Icon.name]: Icon
    },
    computed: {
      countStyle() {
        if (this.color === undefined) return

        return `--badge-bg: ${this.color}`
      }
    }
  }
</script>
