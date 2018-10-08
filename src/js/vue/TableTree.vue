<template>
  <div class="vue-table-tree">
    <input type="hidden" v-if="trigger">
    <table class="table">
      <thead>
      <tr>
        <th width="10">
          <div class="input-checkbox" v-if="selectable">
            <input type="checkbox" value="1" :id="`${_uid}_Select_All`" v-model="selectAll" @change="toggleAll">
            <label :for="`${_uid}_Select_All`">全选</label>
          </div>
        </th>
        <th v-for="title of columns.titles">{{title}}</th>
      </tr>
      </thead>

      <tbody>
      <template v-for="(group, i) of source">
        <tr>
          <td @click="toggleShowGroup(group)" style="padding: 0 5px; cursor: pointer">
            <div class="css-icon-plus-minus" :class="{minus: group.expand}"></div>
          </td>
          <td width="10">
            <div class="input-checkbox" v-if="selectable">
              <input type="checkbox" :id="`${_uid}_Select_Group_${i}`" :value="i" v-model="group.selected" @click="toggleGroup(group)">
              <label :for="`${_uid}_Select_Group_${i}`">{{group.name}}</label>
            </div>
            <span v-else>{{group.name}}</span>
          </td>
          <td :colspan="columns.props.length"></td>
        </tr>

        <template v-if="group.expand">
          <tr v-for="(child, j) of group.children" @click="toggleRow(child, group)">
            <td></td>
            <td></td>
            <td v-for="(prop, k) of columns.props">
              <div class="input-checkbox" v-if="k === 0 && selectable">
                <input type="checkbox" :id="`${_uid}_Select_Row_${i}_${j}`" :value="i" v-model="child.selected">
                <label :for="`${_uid}_Select_Row_${i}_${j}`">{{child[prop]}}</label>
              </div>
              <span v-else>{{child[prop]}}</span>
            </td>
          </tr>
        </template>
      </template>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        trigger: false,
        selectAll: false,
        selected: []
      }
    },
    props: {
      columns: {
        type: Object
      },
      source: {
        type: Array
      },
      selectable: Boolean
    },
    methods: {
      triggerUpdate() {
        this.trigger = !this.trigger
      },
      toggleShowGroup(group) {
        group.expand = !group.expand
        this.triggerUpdate()
      },
      toggleAll() {
        for (let group in this.source) {
          if (!this.source.hasOwnProperty(group)) continue

          this.source[group].selected = this.selectAll

          this.source[group].children.forEach(child => {
            if (!this.selectAll && child.selected) {
              this.selected = this.selected.filter(cur => cur.strategy_id !== child.strategy_id)
            }

            if (this.selectAll && !child.selected) {
              this.selected.push(child)
            }

            child.selected = this.selectAll
          })
        }
        this.triggerUpdate()
        this.$emit('select', this.selected)
      },
      toggleGroup(group) {
        group.children.forEach(child => {
          //某个策略已经选中时取消全选，则去掉该策略
          if (!group.selected && child.selected) {
            this.selected = this.selected.filter(cur => cur.strategy_id !== child.strategy_id)
          }

          //某个策略未被选中时全选，则添加该策略
          if (group.selected && !child.selected) {
            this.selected.push(child)
          }

          child.selected = group.selected
        })

        this.selected.sort((a, b) => a.id - b.id)
        this.checkSelectAll()
        this.triggerUpdate()
        this.$emit('select', this.selected)
      },
      toggleRow(child, group) {
        if (!child.selected) {
          this.selected = this.selected.filter(cur => cur.strategy_id !== child.strategy_id)
        } else {
          this.selected.push(child)

          this.selected.sort((a, b) => a.id - b.id)
        }

        group.selected = group.children.every(child => child.selected)

        this.checkSelectAll()
        this.triggerUpdate()
        this.$emit('select', this.selected)
      },
//      检查是否全部勾选
      checkSelectAll() {
        let selectAll = true
        for (let group in this.source) {
          if (!this.source.hasOwnProperty(group)) continue

          if (!this.source[group].selected) {
            selectAll = false
            break
          }
        }
        this.selectAll = selectAll
      }
    }
  }
</script>
