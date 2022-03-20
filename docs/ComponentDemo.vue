<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="panel">
    <div class="title">{{ title }}</div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="less">
.panel {
  border-bottom: 1px solid #e9e9e9;

  .title {
    font-size: 1.8rem;
    font-weight: 500;
    padding: 12px 16px;
    line-height: 1.25;
    letter-spacing: 1px;
  }

  .content {
    padding: 10px;
  }

  .controls {
    display: flex;
    padding: 20px 10px;
    border-bottom: 1px solid #e9e9e9;

    > * {
      margin-right: 20px;
    }
  }
}
</style>
