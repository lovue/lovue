<template>
  <div class="v-tab">
    <div class="tabs" ref="tabs">
      <div class="tab" v-for="(title, i) of titles_" @click="clickTab(i)"><v-icon :icon="title.icon" size="16" v-if="title.icon"></v-icon>{{title.name}}</div>
      <div class="focus-line" :style="lineStyle"></div>
    </div>
  </div>
</template>

<script>
  import Icon from './Icon.vue'

  export default {
    name: 'v-tab',
    data() {
      return {
        titles_: [],
        tabs: [],
        lineStyle: {},
        index: -1,
        totalWidth: 0,
        tabWidth: 0,
        tabWidths: [],
        innerUpdate: false
      }
    },
    props: {
      value: Number,
      titles: Array,
      lock: Boolean
    },
    components: {
      [Icon.name]: Icon
    },
    watch: {
      value(val) {
        if (this.innerUpdate) {
          this.innerUpdate = false
          return
        }
        this.setTab(val)
      }
    },
    methods: {
      setTab(i) {
        if (this.index === i) return

        this.refreshLinePosition(i)
        this.lineStyle.transition = this.index < i
          ? 'left .3s ease-out .09s, right .3s ease-out'
          : 'left .3s ease-out, right .3s ease-out .09s'
        this.index = i

        this.$emit('input', i)
      },
      clickTab(i) {
        if (this.lock) return
        if (this.index === i) return

        this.setTab(i)
        this.innerUpdate = true
      },
      calculateWidth() {
        this.tabWidths = []
        this.totalWidth = this.$refs.tabs.offsetWidth
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
    created() {
      if (['string', 'number'].includes(typeof this.titles[0])) {
        this.titles_ = this.titles.map(title => ({ name: title }))
      } else {
        this.titles_ = this.titles
      }
    },
    mounted() {
      this.calculateWidth()
      this.setTab(this.value || 0)

      window.addEventListener('resize', this.resize)
    },
    destroyed() {
      window.removeEventListener('resize', this.resize)
    }
  }
</script>
