<template>
  <div class="v-steps">
    <div class="v-step" v-for="(step, i) of steps">
      <div class="s-content" :class="{finished: i < cur, processing: i === cur, wait: i > cur}">
        <v-icon :icon="step.icon" size="16" v-if="step.icon"></v-icon>
        <span class="default-icon" v-else>
          <v-icon icon="check" v-if="i < cur"></v-icon>
          <template v-else>{{i+1}}</template>
        </span>
        {{step.title}}</div>
      <div class="s-line" :class="{success: i < cur}" v-if="i < steps.length-1"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-steps',
    props: {
      cur: {
        type: Number,
        'default': 0
      },
      steps: Array
    }
  }
</script>
