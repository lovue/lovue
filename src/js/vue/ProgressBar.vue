<template>
  <div class="vue-progress-bar">
    <div class="layer-1"></div>
    <div class="layer-2" :style="`width:${progress}%`"></div>
    <div class="layer-3">{{progress}}%</div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../less/Bootstrapping/Variables.less";

  .vue-progress-bar {
    position: relative;
    text-align: center;
    font-size: @small-font;
    width: 200px;
    height: 24px;
    line-height: 24px;

    .layer-1 {
      background-color: @bg-color;
      width: 100%;
      height: 100%;
    }

    .layer-2 {
      position: absolute;
      top: 0;
      width: 0;
      height: 100%;
      background-color: @blue-color;
      transition: width .2s ease-out;
    }

    .layer-3 {
      position: absolute;
      top: 0;
      width: 100%;
    }
  }
</style>
<script>
  export default {
    props: {
      value: Number,
      decimal: Boolean
    },
    computed: {
      progress() {
        if (this.decimal) {
          return this.value * 100
        } else {
          return this.value * 100 | 0
        }
      }
    }
  }
</script>
