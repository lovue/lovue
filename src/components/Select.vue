<template>
  <div class="v-select" @click.stop="showCandidates">
    <div class="selected v-layout-lr">
      <div class="layer-disabled" v-if="disabled"></div>
      <div class="l">
        <template v-if="multiple">
          <span class="s-tag" v-for="(s,i) of selected">
          <span class="tag-name">{{s.name}}</span>
          <v-icon icon="close" @click.native.stop="remove(s,i)"></v-icon>
        </span>
        </template>
        <input class="input" :value="selected.name" v-else placeholder="请选择" readonly>
      </div>
      <div class="r">
        <v-icon icon="down-wide" :class="{reverse: !open}"></v-icon>
      </div>
    </div>
    <div :class="`candidates ${pos} ${open}`" v-show="bShowCandidates">
      <div class="item-search" v-if="searchable"><input class="input" type="text" placeholder="搜索" v-model="filterText"></div>
      <ul class="list">
        <li :class="{focus: i.selected}" v-for="i of filteredItems" @click.stop="toggle(i)">
          <span class="item-name">{{i.name}}</span>
          <v-icon icon="check" v-show="i.selected"></v-icon>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'v-select',
    data() {
      return {
        selected: this.multiple ? [] : {},
        items: [],
        filterText: '',
        bShowCandidates: false,
        pos: '',
        open: ''
      }
    },
    computed: {
      filteredItems() {
        if (this.filterText === '') return this.items
        return this.items.filter(item => item.name.toLowerCase().includes(this.filterText.toLowerCase()))
      }
    },
    props: {
      source: Array,
      current: {
        validator(val) {
          return val
        }
      },
      disabled: Boolean,
      multiple: Boolean,
      searchable: Boolean
    },
    watch: {
      source(val) {
        //Watch source for requesting data from server asynchronously
        this.items = JSON.parse(JSON.stringify(val))
        this.setSelected()
      },
      current(val) {
        this.selected = val ? JSON.parse(JSON.stringify(val)) : this.selected
        this.setSelected()
      }
    },
    methods: {
      setSelected() {
        if(Array.isArray(this.selected)) {
          let tmp = {}
          this.selected.forEach(s => {
            tmp[s.value] = 1
          })
          this.items.forEach(i => {
            i.selected = !!tmp[i.value]
          })
        } else {
          this.items.forEach(i => {
            if(i.value === this.selected.value) {
              i.selected = true
            }
          })
        }
      },
      showCandidates() {
        this.bShowCandidates = true

        const candidatesHeight = (this.searchable ? (this.filteredItems.length + 1) : this.filteredItems.length) * 32
        const bottomSpace = window.innerHeight - this.$el.getBoundingClientRect().bottom
        this.pos = bottomSpace < candidatesHeight ? 'top' : 'bottom'

        this.$nextTick(() => this.open = 'open')
      },
      hideCandidates() {
        this.open = ''
        setTimeout(() => {
          this.pos = ''
          this.bShowCandidates = false
        }, 400)
      },
      toggle(item) {
        if (this.multiple) {
          item.selected = !item.selected

          if (item.selected) {
            this.selected.push(item)
          } else {
            this.selected = this.selected.filter(val => {
              return val.value !== item.value
            })
          }
          this.$emit('update', this.selected)
        } else {
          this.items.forEach(current => {
            current.selected = false
          })
          item.selected = true
          this.selected = item
          this.hideCandidates()
          this.$emit('update', this.selected)
        }
      },
      remove(select, index) {
        this.selected.splice(index, 1)

        this.items.forEach(val => {
          if (val.value === select.value) {
            val.selected = false
          }
        })

        this.$emit('update', this.selected)
      }
    },
    created() {
      //Must deep clone
      this.items = JSON.parse(JSON.stringify(this.source))
      this.selected = this.current ? JSON.parse(JSON.stringify(this.current)) : this.selected
      this.setSelected()
    },
    mounted() {
      window.addEventListener('click', () => this.hideCandidates())
    }
  }
</script>
