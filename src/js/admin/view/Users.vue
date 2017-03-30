<template>
  <div class="view-users">
    <div class="panel">
      <button class="btn" type="button" @click="openAddForm">新增用户</button>
      <form class="form" v-show="bShowAddForm" @submit.prevent="addUser">
        <input type="hidden" :value="current.id" v-if="current.id">
        <div class="row row-inline">
          <div class="cell">
            <input class="input" type="text" name="username" placeholder="用户名" required v-model="current.username">
          </div>
          <div class="cell">
            <input class="input" type="email" name="email" placeholder="邮箱" v-model="current.email">
          </div>
          <div class="cell">
            <select class="select" name="group" v-model="current.groupid">
              <option v-for="g of groups" :value="g.id">{{g.name}}</option>
            </select>
          </div>
          <div class="cell cell-h">
            <button class="btn" type="submit">保存</button>
            <vue-loading v-show="bShowAddLoading"></vue-loading>
          </div>
        </div>
      </form>
    </div>

    <div class="panel">
      <vue-data-tables :data="users" :search-def="getSearchDef()" :row-action-def="getRowActionsDef()">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="group" label="组"></el-table-column>
      </vue-data-tables>
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
        bShowAddLoading: false,
        canSubmit: true,
        users: [],
        groups: [],
        current: {}
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
      getUsers() {
        utils.asyncFetch({
          type: 'get',
          url: 'users'
        }).then(body => {
          this.users = body
        }).catch(error => this.error(error))
      },
      getGroups() {
        utils.asyncFetch({
          type: 'get',
          url: 'groups'
        }).then(body => this.groups = body)
          .catch(error => this.error(error))
      },
      getRowActionsDef() {
        let self = this
        let {users} = this
        let bal = this.$root.$refs.alert

        return [{
          type: 'btn',
          handler(row) {
            self.bShowAddForm = true
            self.current = Object.assign({}, row)
          },
          name: '修改'
        }, {
          type: 'primary',
          handler(row) {
            bal.show({
              type: 'confirm',
              text: '确认删除？'
            }, () => {
              utils.asyncFetch({
                type: 'delete',
                url: `user/${row.id}`
              }).then(() => {
                self.$msg('删除成功')
                for (let i = 0, l = users.length; i < l; i++) {
                  if (users[i].id === row.id) {
                    users.splice(i, 1)
                    break
                  }
                }
              }).catch(error => self.error(error))
            })
          },
          name: '删除'
        }]
      },
      getSearchDef() {
        return {
          offset: 12,
          props: ['username', 'email']
        }
      },
      openAddForm() {
        this.bShowAddForm = true
        this.current = {}
      },
      addUser(ev) {
        if(!this.canSubmit) return

        this.canSubmit = false
        this.bShowAddLoading = true

        utils.fetch({
          type: this.current.id ? 'putForm' : 'form',
          url: this.current.id ? `user/${this.current.id}` : 'admin/user',
          data: new FormData(ev.target)
        }, body => {
          this.canSubmit = true
          this.bShowAddLoading = false

          this.$msg('保存成功')
          this.bShowAddForm = false
          ev.target.reset()
          this.getUsers()
        }, error => {
          this.canSubmit = true
          this.bShowAddLoading = false

          this.error(error.error)
        })
      }
    },
    created() {
      this.getUsers()
      this.getGroups()
    }
  }
</script>
