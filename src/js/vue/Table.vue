<template>
  <div class="vue-table">
    <vue-popup-window title="设置显示或隐藏列" :show="bShowWindow" @close="closeWindow">
      <div slot="content">
        <ul class="list">
          <li class="item">
            <label>全部</label>
            <div class="input-switch">
              <input type="checkbox" :id="`${_uid}_Column_Switch_All`" v-model="showedAllColumns" @click="toggleAllColumns">
              <label :for="`${_uid}_Column_Switch_All`">Off <span class="lever"></span> On</label>
            </div>
          </li>
          <li class="item" v-for="col of columns">
            <label>{{col.title}}</label>
            <div class="input-switch">
              <input type="checkbox" name="checkbox" :value="col.prop" v-model="showedColumns" :id="`${_uid}_Column_Switch_${col.prop}`">
              <label :for="`${_uid}_Column_Switch_${col.prop}`">Off <span class="lever"></span> On</label>
            </div>
          </li>
        </ul>
        <div class="bottom">
          <button class="btn" type="button" @click="saveShowedColumns">保存</button>
        </div>
      </div>
    </vue-popup-window>

    <header class="t-tools" v-if="!simple">
      <div class="t-left">
        <button class="btn-text" type="button" @click="bShowWindow = true">
          <svg class="icon-nav-list">
            <use xlink:href="/img/icons.svg#icon-nav-list"></use>
          </svg>
        </button>
      </div>
      <div class="t-middle"></div>
      <div class="t-right">
        <vue-search @input="filter"></vue-search>
      </div>
    </header>

    <div class="t-table" :class="{'fixed-head': fixedHead && simple}">
      <div class="table-wrap">
        <table class="table">
          <colgroup>
            <col v-if="checkbox">
            <col v-for="col of columns" v-if="showedColumns.includes(col.prop)" :class="`col-${col.prop}`">
          </colgroup>
          <thead>
          <tr>
            <th v-if="checkbox">
              <div class="t-title">
                <div class="input-checkbox">
                  <input type="checkbox" value="1" :id="`${_uid}_Select_Row0`" v-model="selectAll">
                  <label :for="`${_uid}_Select_Row0`">全选</label>
                </div>
              </div>
            </th>
            <th v-for="(column, i) of columns" v-if="showedColumns.includes(column.prop)">
              <div class="t-title">
                {{column.title}}
                <span class="sort-arrows" v-if="column.sortable" @click="handleSortClick(i)">
                  <svg class="icon-arrow-down dir-up" :class="{focus: sortType[i] === 1}"><use xlink:href="/img/icons.svg#icon-arrow-down"></use></svg>
                  <svg class="icon-arrow-down" :class="{focus: sortType[i] === -1}"><use xlink:href="/img/icons.svg#icon-arrow-down"></use></svg>
                </span>
              </div>
            </th>
          </tr>
          </thead>

          <tbody>
          <tr style="text-align: center" v-if="!source.length">
            <td :colspan="showedColumns.length">暂无数据</td>
          </tr>
          <tr v-for="(row, i) of showed" v-if="simple || (i >= slice[0] && i < slice[1])" @click="clickRow(row)">
            <td v-if="checkbox" @click.stop>
              <div class="input-checkbox">
                <input type="checkbox" :id="`${_uid}_Select_Row${i+1}`" :value="i" v-model="selected">
                <label :for="`${_uid}_Select_Row${i+1}`">{{i+1}}</label>
              </div>
            </td>
            <td v-for="column of columns" v-if="showedColumns.includes(column.prop)">
              <slot :name="column.prop" :value="row" v-if="column.custom"></slot>
              <slot :name="column.prop" :value="row" v-else>{{row[column.prop]}}</slot>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="t-footer" v-if="!simple">
      <vue-pagination :total="showed.length" :count-of-page="countOfPage" @update="updateTable"></vue-pagination>
    </div>
  </div>
</template>
<script>
  import utils from 'yikeyong-utils'
  import VueSearch from './Search.vue'
  import VuePagination from './Pagination.vue'
  import VuePopupWindow from './PopupWindow.vue'

  export default {
    data() {
      return {
        filterText: '',
//        过滤后的结果
        filtered: [],
//        显示在页面上的结果
        showed: [],
        slice: [0, 0],
        selected: [],
        selectAll: false,
        sortType: [],
        sortIndex: 0,
        bShowWindow: false,
        showedAllColumns: false,
//        显示在页面上的列
        showedColumns: [],
        showedColumnsTmp: []
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
      defaultColumns: {
        type: Array
      },
      checkbox: Boolean,
      simple: Boolean,
      fixedHead: Boolean,
      countOfPage: {
        type: Number,
        'default': 10
      }
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
      },
      showedColumns(val) {
        this.showedAllColumns = val.length === this.columns.length
      }
    },
    components: { VueSearch, VuePagination, VuePopupWindow },
    methods: {
      initTable() {
        this.showedColumns = this.defaultColumns ? this.defaultColumns.slice() : this.columns.map(column => column.prop)
        this.showedColumnsTmp = this.showedColumns
        this.sortType = []
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
              if(utils.getype(value) === 'object') {
                value = value.name || ''
              }

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
            this.showed = utils.sortObjectArray(this.filtered.slice(), sortColumn, -1)
          } else if (sortType === -1) {
            this.showed.reverse()
          }
        } else {
          this.showed = this.filtered
        }
      },
      toggleAllColumns(ev) {
        this.showedColumns = ev.target.checked ? this.columns.map(column => column.prop) : []
      },
      saveShowedColumns() {
        this.showedColumnsTmp = this.showedColumns
        this.bShowWindow = false
      },
      closeWindow() {
        this.showedColumns = this.showedColumnsTmp
        this.bShowWindow = false
      },
      clickRow(row) {
        this.$emit('click-row', row)
      }
    },
    created() {
      this.initTable()
    }
  }
</script>
