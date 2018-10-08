<template>
  <div class="v-tab">
    <div class="tabs" ref="tabs">
      <div class="tab" v-for="(title,i) of titles" @click="setTab(i)"><v-icon :icon="title.icon" size="16" v-if="title.icon"></v-icon>{{title.name}}</div>
    </div>
    <div class="focus-line" :style="lineStyle"></div>
  </div>
</template>

<script>
  export default {
    name: 'v-tab',
    data() {
      return {
        tabs: [],
        lineStyle: {},
        index: -1,
        totalWidth: 0,
        tabWidth: 0,
        tabWidths: []
      }
    },
    props: {
      titles: Array,
      cur: Number,
      lock: Boolean
    },
    watch: {
      cur(val) {
        this.setTab(val)
      }
    },
    methods: {
      setTab(i) {
        if (this.lock) return

        if (this.index === i) return

        this.refreshLinePosition(i)
        this.lineStyle.transition = this.index < i
          ? 'left .3s ease-out .09s, right .3s ease-out'
          : 'left .3s ease-out, right .3s ease-out .09s'
        this.index = i

        this.$emit('select', i)
      },
      calculateWidth() {
        this.totalWidth = this.$refs.tabs.offsetWidth
        //this.tabWidth = this.$refs.tabs.querySelector('.tab').offsetWidth
        this.$refs.tabs.querySelectorAll('.tab').forEach(el => {
          this.tabWidths.push(el.offsetWidth)
        })
      },
      refreshLinePosition(index) {
        if (index === undefined) {
          index = this.index
        }

        let leftWidth = 0, rightWidth = 0
        for (let i = 0; i < index; i++) {
          leftWidth += this.tabWidths[i]
        }
        rightWidth = this.totalWidth - leftWidth - this.tabWidths[index]

        this.lineStyle = {
          left: `${leftWidth}px`,
          right: `${rightWidth}px`
        }
      },
      resize() {
        this.calculateWidth()
        this.refreshLinePosition()
      }
    },
    mounted() {
      this.calculateWidth()
      this.setTab(this.cur || 0)

      window.addEventListener('resize', this.resize)
    },
    destroyed() {
      window.removeEventListener('resize', this.resize)
    }
  }
</script>
