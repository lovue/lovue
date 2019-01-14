<template>
  <div class="v-step">
    <div class="step-item" v-for="(step, i) of steps">
      <div class="i-content" :class="{finished: i < cur, processing: i === cur, wait: i > cur}">
        <v-icon :icon="step.icon" size="16" v-if="step.icon"></v-icon>
        <span class="default-icon" v-else>
          <v-icon icon="check" v-if="i < cur"></v-icon>
          <template v-else>{{i+1}}</template>
        </span>
        {{step.title}}</div>
      <div class="i-line" :class="{success: i < cur}" v-if="i < steps.length-1"></div>
    </div>
  </div>
</template>

<script>
  import Icon from '../components/Icon.vue'

  export default {
    name: 'v-step',
    props: {
      cur: {
        type: Number,
        'default': 0
      },
      steps: Array
    },
    components: {
      [Icon.name]: Icon
    }
  }
</script>
