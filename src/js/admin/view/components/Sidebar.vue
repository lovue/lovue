<template>
  <aside class="admin-sidebar">
    <div class="sidebar-folder">III</div>
    <div class="sidebar-nav">
      <div class="sidebar-title">
        <span>-</span>
        <span>用户</span>
      </div>
      <ul class="sidebar-items">
        <li class="nav-item">
          <router-link class="nav-link" to="/user/users.html">用户管理</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/user/groups.html">组管理</router-link>
        </li>
      </ul>
    </div>
    <div class="sidebar-nav">
      <div class="sidebar-title">
        <span>-</span>
        <span>系统</span>
      </div>
      <ul class="sidebar-items">
        <li class="nav-item">
          <router-link class="nav-link" to="/user/menus.html">菜单管理</router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>
