<template>
  <div class="view-groups">
    <div class="overlay" v-if="bShowWindow">
      <div class="window-lv2">
        <div class="title-bar">
          <div class="title-name">修改用户组</div>
          <button class="btn-text btn-close" type="button" @click="bShowWindow = false"><span>×</span></button>
        </div>
        <div class="win-content">
          <form class="form" @submit.prevent="saveGroup">
            <div class="row">
              <div class="cell cell-h">
                <label>名称：</label>
                <input class="input" type="text" name="group" :value="current.name" placeholder="用户组名称" required>
              </div>
            </div>
            <div class="row">
              <div class="cell">
                <label>菜单权限</label>
                <div class="menu-filter">
                  <div class="f-list">
                    <div class="f-title">未添加 》</div>
                    <div class="f-content">
                      <ul class="list">
                        <li class="item" v-for="(value, key) in leftTree">
                          <div class="item-text" @click="addMenu(value, key)">{{value.name}}</div>
                          <ul class="sub-list" v-if="value.submenu">
                            <li class="sub-item" v-for="(subvalue, subkey) in value.submenu">
                              <div class="item-text" @click="addMenu(subvalue, subkey)">{{subvalue.name}}</div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="f-list">
                    <div class="f-title">《 已有</div>
                    <div class="f-content">
                      <ul class="list">
                        <li class="item" v-for="(value, key) in addedTree">
                          <div class="item-text" @click="removeMenu(value, key)">{{value.name}}</div>
                          <ul class="sub-list" v-if="value.submenu">
                            <li class="sub-item" v-for="(subvalue, subkey) in value.submenu">
                              <div class="item-text" @click="removeMenu(subvalue, subkey)">{{subvalue.name}}</div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="row row-submit">
              <button class="btn" type="submit">保存</button>
              <vue-loading v-if="bShowSaveLoading"></vue-loading>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="panel">
      <button class="btn" type="button" @click="bShowAddForm = true">新增用户组</button>
      <form class="form" v-show="bShowAddForm" @submit.prevent="addGroup">
        <div class="row row-inline">
          <div class="cell">
            <input class="input" type="text" name="group" placeholder="用户组名称" required>
          </div>
          <div class="cell cell-h">
            <button class="btn" type="submit">保存</button>
            <vue-loading v-show="bShowAddLoading"></vue-loading>
          </div>
        </div>
      </form>
    </div>

    <div class="panel">
      <table class="table">
        <thead>
        <tr>
          <th>ID</th>
          <th>用户组名称</th>
          <th>操作</th>
        </tr>
        </thead>

        <tbody>
        <tr class="row-loading" v-if="bShowTableLoading">
          <td colspan="3">
            <vue-loading></vue-loading>
          </td>
        </tr>
        <tr v-for="(g, i) of groups">
          <td>{{g.id}}</td>
          <td>{{g.name}}</td>
          <td>
            <button class="btn-text" type="button" @click="openEditForm(g)">修改</button>
            <button class="btn-text" type="button" @click="deleteGroup(g, i)">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import utils from '../../lib/utils'
  import VueDataTables from 'vue-data-tables'
  import VueLoading from '../../../components/Loading.vue'

  export default {
    data() {
      return {
        bShowAddForm: false,
        bShowWindow: false,
        bShowAddLoading: false,
        bShowTableLoading: false,
        bShowSaveLoading: false,
        canSubmit: true,
        groups: [],
        current: {},
        menus: {},
        leftMenus: {},
        addedMenus: {}
      }
    },
    computed: {
      leftTree() {
        return this.makingTree(this.leftMenus)
      },
      addedTree() {
        return this.makingTree(this.addedMenus)
      }
    },
    components: { VueDataTables, VueLoading },
    methods: {
      error(text) {
        this.$msg({
          message: text,
          type: 'error'
        })
      },
      makingTree(menus) {
        let obj = {}
        for (let key in menus) {
          if (menus.hasOwnProperty(key) && !menus[key].father) {
            obj[key] = JSON.parse(JSON.stringify(menus[key]))
          }
        }
        for (let key in menus) {
          if (menus.hasOwnProperty(key)) {
            let fatherId = menus[key].father
            if (fatherId) {
               if(!obj[fatherId].submenu) {
                 obj[fatherId].submenu = {}
               }
              obj[fatherId].submenu[key] = JSON.parse(JSON.stringify(menus[key]))
            }
          }
        }

        return obj
      },
      getGroups() {
        this.bShowTableLoading = true
        utils.asyncFetch({
          type: 'get',
          url: 'groups'
        }).then(body => {
          this.groups = body
          this.bShowTableLoading = false
        })
      },
      getMenus() {
        utils.asyncFetch({
          type: 'get',
          url: 'menus'
        }).then(body => this.menus = body)
      },
      moveMenu(left, right, value, key) {
        if (value.father) {
          right[key] = value
          right[value.father] = this.menus[value.father]
          delete left[key]

          //if delete all
          let clear = true
          for (let k in left) {
            if (left.hasOwnProperty(k)) {
              if (left[k].father === value.father) {
                clear = false
              }
            }
          }
          if (clear) {
            delete left[value.father]
          }
        } else {
          right[key] = value
          delete left[key]

          for (let k in left) {
            if (left.hasOwnProperty(k)) {
              if (left[k].father === Number.parseInt(key)) {
                right[k] = left[k]
                delete left[k]
              }
            }
          }
        }

        return {
          left: Object.assign({}, left),
          right: Object.assign({}, right)
        }
      },
      addMenu(value, key) {
        let result = this.moveMenu(this.leftMenus, this.addedMenus, value, key)
        this.leftMenus = result.left
        this.addedMenus = result.right
      },
      removeMenu(value, key) {
        let result = this.moveMenu(this.addedMenus, this.leftMenus, value, key)
        this.leftMenus = result.right
        this.addedMenus = result.left
      },
      getMenusByIds(list) {
        let result = {}
        list.forEach(id => {
          result[id] = this.menus[id]
          let fatherId = this.menus[id].father
          if (fatherId && !result[fatherId]) {
            result[fatherId] = this.menus[fatherId]
          }
        })
        return result
      },
      addGroup(ev) {
        if (!this.canSubmit) return

        this.bShowAddLoading = true
        this.canSubmit = false

        utils.asyncFetch({
          type: 'form',
          url: 'group',
          data: new FormData(ev.target)
        }).then(body => {
          this.bShowAddLoading = false
          this.$msg('保存成功')
          this.bShowAddForm = false
          this.canSubmit = true
          this.groups.push(body)
        }).catch(error => this.error(error))
      },
      openEditForm(group) {
        this.current = group
        this.leftMenus = this.getMenusByIds(Object.keys(this.menus)
          .map(id => Number.parseInt(id))
          .filter(id => !group.menu.includes(id)))
        this.addedMenus = this.getMenusByIds(group.menu)

        this.bShowWindow = true
      },
      deleteGroup(group, index) {
        let bal = this.$root.$refs.alert
        bal.show({
          type: 'confirm',
          text: '确认删除该用户组？'
        }, () => {
          utils.asyncFetch({
            type: 'delete',
            url: `group/${group.id}`
          }).then(() => {
            this.$msg('删除成功')
            this.groups.splice(index, 1)
          }).catch(error => this.error(error))
        })
      },
      saveGroup(ev) {
        if (!this.canSubmit) return

        this.canSubmit = false
        this.bShowSaveLoading = true

        utils.fetch({
          type: 'put',
          url: `group/${this.current.id}`,
          data: {
            group: ev.target.group.value,
            permissions: Object.keys(this.addedMenus).map(id => Number.parseInt(id))
          }
        }, body => {
          this.canSubmit = true
          this.bShowSaveLoading = false

          this.$msg('保存成功')
          this.groups.forEach((group, index) => {
            if (group.id === body.id) {
              this.groups[index] = body
              this.bShowWindow = false
            }
          })
        })
      }
    },
    created() {
      this.getGroups()
      this.getMenus()
    }
  }
</script>
