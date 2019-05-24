<template>
  <div class="v-select" @click="showCandidates">
    <div class="selected layout-lr" :disabled="disabled">
      <div class="layer-disabled" v-if="disabled"></div>
      <div class="l">
        <template v-if="multiple">
          <span class="s-tag" v-for="(s,i) of selected">
            <span class="tag-name">{{s.name}}</span>
            <v-icon icon="close" @click.native.stop="remove(s,i)"></v-icon>
          </span>
          <span class="placeholder" v-if="!selected.length">{{placeholder || '请选择'}}</span>
        </template>
        <template v-else>
          <input class="input" :value="selected.name" :placeholder="placeholder || '请选择'" readonly>
          <v-icon class="icon-clear" icon="close" size="16" @click.native.stop="clearSelected" v-if="clearable && selected.name"></v-icon>
        </template>
      </div>
      <div class="r">
        <v-icon icon="down-wide" :class="{reverse: !open}"></v-icon>
      </div>
    </div>
    <div :class="`candidates ${pos} ${open}`" v-show="bShowCandidates">
      <div class="item-search" v-if="searchable"><input class="input" :placeholder="searchPlaceholder || '搜索'" v-model="filterText"></div>
      <ul class="list">
        <li v-for="i of filteredItems" :title="i.name" @click.stop="toggle(i)">
          <div class="i-title" :class="{focus: i.selected}"><span class="t-name">{{i.name}}</span><v-icon icon="check" v-if="i.selected"></v-icon></div>
          <ul class="sub-list" v-if="i.children && i.children.length">
            <li v-for="child of i.children" :title="child.name" @click.stop="toggle(child)">
              <div class="i-title" :class="{focus: child.selected}"><span class="t-name">{{child.name}}</span><v-icon icon="check" v-if="child.selected"></v-icon></div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Icon from './Icon.vue'

  export default {
    name: 'v-select',
    data() {
      return {
        selfClicked: false,
        selected: this.multiple ? [] : {},
        items: JSON.parse(JSON.stringify(this.source)),
        filterText: '',
        bShowCandidates: false,
        innerUpdate: false,
        pos: '',
        open: ''
      }
    },
    components: {
      [Icon.name]: Icon
    },
    computed: {
      filteredItems() {
        if (this.filterText === '') return this.items
        return this.items.filter(item => item.name.toLowerCase().includes(this.filterText.toLowerCase()))
      }
    },
    props: {
      value: [String, Number, Array, Object],
      source: Array,
      disabled: Boolean,
      multiple: Boolean,
      searchable: Boolean,
      placeholder: String,
      searchPlaceholder: String,
      max: Number,
      emitItem: Boolean,
      clearable: Boolean
    },
    watch: {
      source(val) {
        //Watch source for requesting data from server asynchronously
        this.items = JSON.parse(JSON.stringify(val))
        this.updateSelected(this.value)
      },
      value: {
        handler: 'updateSelected',
        immediate: true
      }
    },
    methods: {
      updateSelected(val) {
        if (this.innerUpdate) {
          this.innerUpdate = false
          return
        }

        let match
        if (Array.isArray(val)) {
          match = []
          this.items.forEach(item => {
            item.selected = false
            if (val.includes(item.value)) {
              item.selected = true
              match.push({
                name: item.name,
                value: item.value
              })
            }

            if (item.children) {
              item.children.forEach(child => {
                child.selected = false
                if (val.includes(child.value)) {
                  child.selected = true
                  match.push({
                    name: child.name,
                    value: child.value
                  })
                }
              })
            }
          })
        } else {
          match = {}
          this.items.forEach(item => {
            item.selected = false
            if (item.value === val) {
              item.selected = true
              match = { name: item.name, value: item.value }
            }

            if (item.children) {
              item.children.forEach(child => {
                child.selected = false
                if (child.value === val) {
                  child.selected = true
                  match = { name: child.name, value: child.value }
                }
              })
            }
          })
        }
        this.selected = JSON.parse(JSON.stringify(match))
      },
      showCandidates() {
        this.selfClicked = true
        if (this.disabled) return
        if (this.bShowCandidates) return
        this.bShowCandidates = true

        let items = 0
        this.filteredItems.forEach(item => {
          items += item.children ? (item.children.length + 1) : 1
        })
        const candidatesHeight = Math.min((this.searchable ? (items + 1) : items) * 32, 320)
        const bottomSpace = window.innerHeight - this.$el.getBoundingClientRect().bottom
        this.pos = bottomSpace < candidatesHeight ? 'top' : 'bottom'

        setTimeout(() => this.open = 'open', 40)
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
            if (this.max && this.selected.length >= this.max) {
              this.warn(`最多只能选择${this.max}个`)
              item.selected = false
            } else {
              this.selected.push(item)
            }
          } else {
            this.selected = this.selected.filter(val => {
              return val.value !== item.value
            })
          }
          this.innerUpdate = true
          this.$emit('input', this.emitItem ? this.selected : this.selected.map(s => s.value))
        } else {
          this.items.forEach(current => {
            current.selected = false

            if (current.children) {
              current.children.forEach(child => child.selected = false)
            }
          })
          item.selected = true
          this.selected = item
          this.hideCandidates()
          this.innerUpdate = true
          this.$emit('input', this.emitItem ? this.selected : this.selected.value)
        }
      },
      clearSelected() {
        this.selected = {}
        this.$emit('input', this.emitItem ? this.selected : this.selected.value)
      },
      remove(select, index) {
        this.selected.splice(index, 1)

        this.items.forEach(item => {
          if (item.value === select.value) {
            item.selected = false
          } else if (item.children) {
            item.children.forEach(child => {
              if (child.value === select.value) {
                child.selected = false
              }
            })
          }
        })

        this.innerUpdate = true
        this.$emit('input', this.emitItem ? this.selected : this.selected.map(s => s.value))
      }
    },
    mounted() {
      window.addEventListener('click', () => {
        // 当点击组件之外的区域（包括其他Select组件）时，隐藏下拉列表；点击组件自身时不做任何处理
        if (!this.selfClicked) this.hideCandidates()
        this.selfClicked = false
      })
    }
  }
</script>
