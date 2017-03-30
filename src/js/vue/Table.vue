<template>
  <div class="vue-table">
    <header class="t-tools">
      <div class="t-left"></div>
      <div class="t-middle"></div>
      <div class="t-right">
        <vue-search @input="filter"></vue-search>
      </div>
    </header>
    <table class="table">
      <thead>
      <tr>
        <th v-if="checkbox">
          <div class="input-checkbox">
            <input type="checkbox" value="1" id="vue-table-I_checkbox0" v-model="selectAll">
            <label for="vue-table-I_checkbox0">全选</label>
          </div>
        </th>
        <th v-for="(column, i) of columns">{{column.title}}<span class="sort-arrows" v-if="column.sortable" @click="handleSortClick(i)">
          <svg class="icon-arrow-down dir-up" :class="{focus: sortType[i] === 1}"><use xlink:href="/static/platform/img/icons.svg#icon-arrow-down"></use></svg>
          <svg class="icon-arrow-down" :class="{focus: sortType[i] === -1}"><use xlink:href="/static/platform/img/icons.svg#icon-arrow-down"></use></svg>
        </span></th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(row, i) of showed" v-if="i >= slice[0] && i < slice[1]">
        <td v-if="checkbox">
          <div class="input-checkbox">
            <input type="checkbox" :id="`vue-table-I_checkbox${i+1}`" :value="i" v-model="selected">
            <label :for="`vue-table-I_checkbox${i+1}`"></label>
          </div>
        </td>
        <td v-for="column of columns">
          <slot :name="column.prop" :value="row" v-if="column.custom"></slot>
          <slot :name="column.prop" :value="row" v-else>{{row[column.prop]}}</slot>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="t-footer">
      <vue-pagination :total="showed.length" :count-of-page="countOfPage" @update="updateTable"></vue-pagination>
    </div>
  </div>
</template>
<script>
  import VueSearch from './Search.vue'
  import VuePagination from './Pagination.vue'

  export default {
    data() {
      return {
        filterText: '',
        filtered: [],
        showed: [],
        slice: [0, 0],
        selected: [],
        selectAll: false,
        sortType: [],
        sortIndex: 0
      }
    },
    props: {
      source: Array,
      columns: Array,
      checkbox: Boolean,
      countOfPage: Number
    },
    computed: {
      columnProps() {
        let arr = []
        this.columns.forEach(column => column.custom || arr.push(column.prop))
        return arr
      }
    },
    watch: {
      source() {
        this.filter(this.filterText)
      },
      filtered() {
        if(this.checkbox) {
          this.selectAll = false
          this.selected = []
        }
      },
      slice() {
        this.checkbox && (this.selectAll = false)
      },
      selectAll(val) {
        if (!val) {
          this.selected = []
        } else {
          let [start, end] = this.slice
          let arr = []
          while (start < end) {
            arr.push(start)
            start++
          }
          this.selected = arr
        }
      },
      selected(val) {
        this.$emit('check', this.filtered.filter((row, index) => val.includes(index)))
      }
    },
    components: { VueSearch, VuePagination },
    methods: {
      filter(words) {
        let result = []
        if (words === '') {
          result = this.source.slice()
        } else {
          result = this.source.filter(row => {
            return this.columnProps.some(prop => {
              return row[prop].toString().toLowerCase().includes(words.toLowerCase())
            })
          })
        }
        this.filtered = result
        this.sort()
        this.filterText = words
      },
      updateTable(slice) {
        this.slice = slice
      },
      handleSortClick(index) {
        this.sortIndex = index
        if (this.sortType[index] === 1) {
          this.sortType.splice(index, 1, -1)
        } else if (this.sortType[index] === -1) {
          this.sortType = []
        } else {
          this.sortType = []
          this.sortType[index] = 1
        }

        this.sort()
      },
      sort() {
        if (this.sortType.length) {
          let sortColumn = this.columnProps[this.sortIndex],
            sortType = this.sortType[this.sortIndex]

          if (sortType === 1) {
            this.showed = this.filtered.slice().sort((a, b) => {
              if(typeof a[sortColumn] === 'number') {
                return b[sortColumn] - a[sortColumn]
              } else {
                return new Intl.Collator(/*'zh-Hans-CN', */{
                  sensitivity: 'base'
                }).compare(b, a)
              }
            })
          } else if (sortType === -1) {
            this.showed.reverse()
          }
        } else {
          this.showed = this.filtered
        }
      }
    },
    created() {
      this.filter(this.filterText)
    }
  }
</script>
