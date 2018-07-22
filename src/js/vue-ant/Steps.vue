<template>
  <div class="ant-steps">
    <div class="ant-step" v-for="(step, i) of steps">
      <div class="as-content" :class="{finished: i < current, processing: i === current, wait: i > current}">
        <v-icon :icon="step.icon" size="16" v-if="step.icon"></v-icon>
        <span class="default-icon" v-else>
          <v-icon icon="check" v-if="i < current"></v-icon>
          <template v-else>{{i+1}}</template>
        </span>
        {{step.title}}</div>
      <div class="as-line" :class="{success: i < current}" v-if="i < steps.length-1"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-steps',
    props: {
      current: Number,
      steps: Array
    }
  }
</script>
