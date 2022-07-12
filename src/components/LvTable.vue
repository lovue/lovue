<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import LvIcon from './LvIcon.vue'
import LvSearch from './LvSearch.vue'
import LvOptions from './LvOptions.vue'
import LvPagination, { Pagination } from './LvPagination.vue'

export interface Column {
  title?: string
  prop?: string
  sortable?: boolean
  cssClass?: string
  formatter?: 'thousands' | 'numberToBoolean' | (<T>(x: T) => T)
}

const props = withDefaults(defineProps<{
  rows: []
  columns: Column[]
  simple?: boolean
  simplePagination?: boolean
  fixedHead?: boolean
  checkbox?: boolean
  emptyText?: string
  total?: number
  loading?: boolean
}>(), {
  emptyText: '暂无数据'
})
const emit = defineEmits(['click-row', 'checked'])

const formatters = {
  thousands (value: number) {
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 6 }).format(value)
  },
  numberToBoolean (value: number) {
    return Boolean(value)
  }
}

const searchKeywords = ref('')
const sortConfig = ref<{
  [key: string]: number
}>({})
const pagination = ref<Pagination>({ index: 1, pageSize: 10 })
const selectAll = ref(false)
const selectedRowIndexes = ref<number[]>([])

const totalRows = computed(() => {
  if (props.total) return props.total

  if (props.simple) return finalRows.value.length

  return filteredRows.value.length
})
const filteredRows = computed(() => {
  const _rows = props.rows.slice()

  if (searchKeywords.value === '') return _rows

  return _rows.filter((_row: any) => props.columns.some(_column => {
    if (!_column.prop) return false
    if (!_row[_column.prop]) return false

    const cellValue = _row[_column.prop].toString().toLowerCase()
    const keywords = searchKeywords.value.toLowerCase()

    return cellValue.includes(keywords)
  }))
})
const sortedRows = computed(() => {
  const _rows = filteredRows.value.slice()
  const sortedColumn = Object.keys(sortConfig.value)[0]

  if (sortedColumn === undefined) return _rows

  const sortDirection = sortConfig.value[sortedColumn]

  return _rows.sort((a, b) => {
    if (typeof a[sortedColumn] === 'number') {
      if (sortDirection > 0) return a[sortedColumn] - 1
      return 1 - a[sortedColumn]
    }

    return new Intl.Collator(undefined, {
      sensitivity: 'base'
    }).compare(sortDirection > 0 ? a[sortedColumn] : b[sortedColumn], sortDirection > 0 ? b[sortedColumn] : a[sortedColumn])
  })
})
const finalRows = computed(() => {
  // filter -> sort -> paginate
  if (props.simple) return sortedRows.value

  const startIndex = (pagination.value.index - 1) * pagination.value.pageSize
  const endIndex = startIndex + pagination.value.pageSize

  return sortedRows.value.slice(startIndex, endIndex)
})
const selectedRows = computed(() => selectedRowIndexes.value.map(_index => sortedRows.value[_index]))

watch(selectAll, value => {
  if (!value) {
    selectedRowIndexes.value = []
    return
  }

  selectedRowIndexes.value = sortedRows.value.map((_row, _index) => _index)
})
watch(selectedRows, value => {
  emit('checked', value)
})

function flipOver (_pagination: Pagination) {
  pagination.value = _pagination
}

function updateSortConfig (columnProp: string) {
  if (sortConfig.value[columnProp] === undefined) {
    sortConfig.value = {}
    sortConfig.value[columnProp] = 1
  } else if (sortConfig.value[columnProp] === 1) {
    sortConfig.value[columnProp] = -1
  } else if (sortConfig.value[columnProp] === -1) {
    sortConfig.value = {}
  }
}

function processCell (_row: any, _column: Column) {
  if (_column.prop === undefined) return ''

  const cellValue = _row[_column.prop]

  if (typeof _column.formatter === 'string' && formatters[_column.formatter]) {
    return formatters[_column.formatter](cellValue)
  }

  if (typeof _column.formatter === 'function') {
    return _column.formatter(cellValue)
  }

  return cellValue
}
</script>

<template>
  <div class="lv-table">
    <div class="lv-table__tools" v-if="!simple">
      <slot name="tools">
        <LvSearch v-model="searchKeywords" />
      </slot>
    </div>

    <div class="lv-table__main" :class="{'status--fixed-head': fixedHead}">
      <div class="table-wrap">
        <table class="lv-table__table">
          <colgroup>
            <col v-if="checkbox">
            <col v-for="column of columns" :key="`column-${column.prop}`" :class="`column-${column.prop}`">
          </colgroup>
          <thead>
            <tr>
              <th v-if="checkbox">
                <div class="lv-table__title">
                  <LvOptions type="checkbox" :items="[{ text: '全选', value: null }]" v-model="selectAll" />
                </div>
              </th>
              <th v-for="column of columns" :key="`title-${column.prop}`" :class="column.cssClass">
                <div class="lv-table__title" :class="column.cssClass">
                  {{ column.title }}
                  <span class="sort-arrows" v-if="column.sortable" @click="updateSortConfig(column.prop)">
                    <LvIcon icon="down-wide" class="dir-up" :class="{'status--focus': sortConfig[column.prop] === 1}" />
                    <LvIcon icon="down-wide" :class="{'status--focus': sortConfig[column.prop] === -1}" />
                  </span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr class="no-data-row" v-if="!rows.length">
              <td :colspan="columns.length">{{ emptyText }}</td>
            </tr>
            <tr
              v-for="(row, i) of finalRows"
              :key="`row-${i}`"
              :class="{'status--focus': row._focused}"
              @click="$emit('click-row', row)"
            >
              <td v-if="checkbox" @click.stop>
                <LvOptions type="checkbox" :items="[{ text: '', value: (pagination.index - 1) * pagination.pageSize + i }]" v-model="selectedRowIndexes" />
              </td>
              <td v-for="column of columns" :key="`row-${i}-column-${column.prop}`" :class="column.cssClass">
                <slot :name="column.prop" :value="row">{{ processCell(row, column) }}</slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="lv-table__footer" v-if="!simple && rows.length">
      <LvPagination :total="totalRows" :simple="simplePagination" @update="flipOver" />
    </div>

    <div class="lv-table__loading" v-if="loading">
      <LvIcon icon="refresh" :class="{loading: loading}" />
    </div>
  </div>
</template>

<style lang="less">
@import (reference) "../Mixins";

.lv-table {
  position: relative;
}

.lv-table__tools {
  .flex-between;

  margin-bottom: var(--unit);
}

.lv-table__main {
  position: relative;
  overflow-x: auto;
  border-left: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
}

.lv-table__table {
  .table();

  border-left: 0;
  border-right: 0;

  > thead {
    > tr {
      > th {
        color: #666;
        line-height: 28px;

        &.sticky {
          position: sticky;
          background-color: #f5f6fa;

          &.left {
            left: 0;
            box-shadow: 1px 5px 8px rgb(0 0 0 / 8%);
          }

          &.right {
            right: 0;
            box-shadow: -1px 5px 8px rgb(0 0 0 / 8%);
          }
        }
      }
    }
  }

  > tbody {
    > tr {
      > td {
        transition: background-color 0.2s ease;

        &.sticky {
          position: sticky;
          background-color: var(--white);

          &.left {
            left: 0;
            box-shadow: 1px 5px 8px rgb(0 0 0 / 8%);
          }

          &.right {
            right: 0;
            box-shadow: -1px 5px 8px rgb(0 0 0 / 8%);
          }
        }
      }

      &.no-data-row {
        > td {
          text-align: center;
          color: var(--second-color);
        }
      }

      &.focus {
        background-color: var(--table-highlight);

        > td {
          &.sticky {
            background-color: var(--table-highlight);
          }
        }

        &:hover {
          > td {
            &.sticky {
              background-color: var(--table-highlight);
            }
          }
        }
      }

      &:hover {
        > td {
          &.sticky {
            background-color: var(--bg-color);
          }
        }
      }
    }
  }
}

.lv-table__main.status--fixed-head {
  position: relative;
  padding-top: var(--5unit);
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);

  .table-wrap {
    max-height: 400px;
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .lv-table__table {
    background-color: var(--white);
    border: none;
    border-top: 1px solid var(--border-color);

    > thead {
      border: none;

      > tr {
        height: 0;

        > th {
          height: 0;
          line-height: 0;
          padding: 0;
        }
      }
    }
  }

  .lv-table__title {
    position: absolute;
    top: 0;
    height: var(--5unit);
    padding: 0 15px;

    .sort-arrows {
      vertical-align: middle;
    }
  }
}

.lv-table__title {
  .flex-start;

  .sort-arrows {
    display: inline-block;
    vertical-align: bottom;
    user-select: none;
    cursor: pointer;

    .lv-icon-down-wide {
      display: block;
      width: 20px;
      height: 12px;
      color: var(--second-color);

      &.dir-up {
        transform: rotateX(180deg);
      }

      &.status--focus {
        color: var(--black);
      }
    }
  }
}

.lv-table__footer {
  margin-top: var(--unit);
}

.lv-table__loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--light-white);

  .lv-icon-refresh {
    color: var(--blue-color);
  }
}
</style>
