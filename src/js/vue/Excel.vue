<template>
  <div class="vue-excel">
    <div class="ve-head">
      <div class="col-0"></div>
      <div class="col-head" :class="{focus: focusedCell.column === i}" v-for="(char, i) of columnChars">{{char}}</div>
    </div>
    <div class="ve-row" v-for="row of rows">
      <div class="col-0" :class="{focus: focusedCell.row === row}">{{row}}</div>
      <div class="col-cell" v-for="(char, i) of columnChars">
        <input class="input" type="text" @focus="focused($event, row, i)" @blur="blured">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        columnChars: [],
        focusedCell: {
          row: -1,
          column: -1
        }
      }
    },
    props: {
      rows: {
        type: Number,
        'default': 20
      },
      columns: {
        type: Number,
        'default': 30
      }
    },
    methods: {
      focused(ev, row, column) {
        ev.target.style.textAlign = 'left'
        this.focusedCell = {row, column}
      },
      blured(ev) {
        ev.target.style.textAlign = 'right'
        this.focusedCell = {
          row: -1,
          column: -1
        }
      }
    },
    created() {
      for (let i=0;i<this.columns;i++) {
        let x = Math.floor(i / 26), y = i % 26
        let prefix = x ? String.fromCharCode('A'.charCodeAt(0) + x - 1) : ''

        this.columnChars.push(prefix + String.fromCharCode('A'.charCodeAt(0) + y))
      }
    }
  }
</script>
