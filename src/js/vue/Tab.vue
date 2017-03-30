<template>
  <div class="vue-tab">
    <div class="tabs" ref="tabs">
      <div class="tab" v-for="(title,i) of titles" @click="setTab(i)">{{title}}</div>
    </div>
    <div class="focus-line" :style="lineStyle"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tabs: [],
        lineStyle: "",
        index: -1
      }
    },
    props: {
      titles: Array,
      cur: Number
    },
    methods: {
      setTab(i) {
        if (this.index === i) return

        this.refreshLinePosition(i)
        this.lineStyle.transition = this.index < i
          ? "left .3s ease-out .09s, right .3s ease-out"
          : "left .3s ease-out, right .3s ease-out .09s"
        this.index = i

        this.$emit('select', i)
      },
      calculateWidth() {
        this.totalWidth = this.$refs.tabs.offsetWidth
        this.tabWidth = this.$refs.tabs.querySelector('.tab').offsetWidth
      },
      refreshLinePosition(index) {
        if(index === undefined) {
          index = this.index
        }

        this.lineStyle = {
          left: this.tabWidth * index + "px",
          right: (this.totalWidth - this.tabWidth * (index + 1)) + "px"
        }
      }
    },
    mounted() {
      this.calculateWidth()
      this.setTab(this.cur || 0)

      window.addEventListener('resize', () => {
        this.calculateWidth()
        this.refreshLinePosition()
      })
    }
  }
</script>
