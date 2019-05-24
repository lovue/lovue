<template>
  <div class="v-table">
    <header class="t-tools" v-if="!simple">
      <div class="l"><slot name="tools-l"></slot></div>
      <div class="m"><slot name="tools-m"></slot></div>
      <div class="r">
        <v-search @search="filter" :delay="300"></v-search>
      </div>
    </header>

    <div class="t-table" :class="{'fixed-head': fixedHead}">
      <div class="table-wrap">
        <table class="table">
          <colgroup>
            <col v-if="checkbox">
            <col v-for="col of columns" :class="`col-${col.prop}`">
          </colgroup>
          <thead>
          <tr>
            <th v-if="checkbox && source.length">
              <div class="t-title">
                <v-checkbox label="全选" v-model="selectAll"></v-checkbox>
              </div>
            </th>
            <th v-for="(column, i) of columns" :class="column.cssClass">
              <div class="t-title" :class="column.cssClass">
                {{column.title}}
                <span class="sort-arrows" v-if="column.sortable" @click="handleSortClick(i)">
                  <v-icon icon="down-wide" :class="{'dir-up': true, focus: sortType[i] === 1}"></v-icon>
                  <v-icon icon="down-wide" :class="{focus: sortType[i] === -1}"></v-icon>
                </span>
              </div>
            </th>
          </tr>
          </thead>

          <tbody>
          <tr class="no-data-row" v-if="!source.length">
            <td :colspan="columns.length">{{emptyText || '暂无数据'}}</td>
          </tr>
          <tr v-for="(row, i) of showed" v-if="simple || (i >= slice[0] && i < slice[1])" :class="{focus: row.focused}" @click="$emit('click-row', row)" @dblclick="$emit('dbl-click-row', row)">
            <td v-if="checkbox" @click.stop>
              <label class="v-checkbox">
                <input type="checkbox" :value="i" v-model="selected">
                <span>{{checkboxColumn ? row[checkboxColumn] : (i + 1)}}</span>
              </label>
            </td>
            <td v-for="column of columns" :class="column.cssClass">
              <slot :name="column.prop" :value="row">{{filterSlot(row, column)}}</slot>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="t-footer" v-if="!simple && source.length">
      <v-pagination :total="total || showed.length" :page-counts="pageCounts" :count-of-page="countOfPage" @update="updateTable" :simple="simplePagination" :no-border="paginationNoBorder"></v-pagination>
    </div>
  </div>
</template>
<script>
  import Checkbox from './Checkbox.vue'
  import Icon from './Icon.vue'
  import Pagination from './Pagination.vue'
  import Search from './Search.vue'

  export default {
    name: 'v-table',
    data() {
      return {
        filterText: '',
        //过滤后的结果
        filtered: [],
        //显示在页面上的结果
        showed: [],
        slice: [0, 0],
        selected: [],
        selectAll: false,
        sortType: [],
        sortIndex: 0
      }
    },
    props: {
      source: {
        type: Array,
        default() {
          return []
        }
      },
      columns: {
        type: Array,
        default() {
          return []
        }
      },
      checkbox: Boolean,
      checkboxColumn: String,
      simple: Boolean,
      fixedHead: Boolean,
      pageCounts: Array,
      countOfPage: Number,
      keepSort: Boolean,
      filters: {
        type: Array,
        'default'() {
          return [
            function (value) {
              if (typeof Intl === 'undefined') return value
              if (value === undefined) return 0

              return new Intl.NumberFormat(undefined, { maximumFractionDigits: 6 }).format(value)
            },
            function (value) {
              return Boolean(value)
            }
          ]
        }
      },
      total: Number,
      emptyText: String,
      simplePagination: Boolean,
      paginationNoBorder: Boolean
    },
    components: {
      [Checkbox.name]: Checkbox,
      [Icon.name]: Icon,
      [Pagination.name]: Pagination,
      [Search.name]: Search
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
        this.initTable()
      },
      filtered() {
        if (this.checkbox) {
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
          return
        }

        if (this.simple) {
          this.selected = this.showed.map((value, key) => key)
          return
        }

        let [start, end] = this.slice
        let arr = []
        while (start < end) {
          arr.push(start)
          start++
        }
        this.selected = arr
      },
      selected(val, oldVal) {
        if (val.length === 0 && oldVal.length === 0) return
        this.updateChecked(val)
      }
    },
    methods: {
      filterSlot(row, column) {
        if (column.custom) return undefined

        if (column.filter !== undefined) return this.filters[column.filter](row[column.prop])

        return row[column.prop]
      },
      initTable() {
        this.keepSort || (this.sortType = [])
        this.filter(this.filterText)
      },
      filter(words) {
        let result = []
        if (words === '') {
          result = this.source.slice()
        } else {
          result = this.source.filter(row => {
            return this.columnProps.some(prop => {
              let value = row[prop] || ''

              return value.toString().toLowerCase().includes(words.toLowerCase())
            })
          })
        }
        this.filtered = result
        this.sort()
        this.filterText = words
      },
      updateTable(slice) {
        this.slice = slice
        this.$emit('flip', this.slice)
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

          this.showed = this.sortArray(this.filtered.slice(), sortColumn, sortType)
        } else {
          this.showed = this.filtered
        }
        this.updateChecked()
      },
      updateChecked(val) {
        const selected = val || this.selected
        this.$emit('check', this.showed.filter((row, index) => selected.includes(index)))
      },
      sortArray(arr, column, dir = 1) {
        arr.sort((a, b) => {
          if (typeof a[column] === 'number') return dir > 0 ? (a[column] - b[column]) : (b[column] - a[column])

          return new Intl.Collator(/*'zh-Hans-CN', */{
            sensitivity: 'base'
          }).compare(dir > 0 ? a[column] : b[column], dir > 0 ? b[column] : a[column])
        })
        return arr
      }
    },
    created() {
      this.initTable()
    }
  }
</script>
