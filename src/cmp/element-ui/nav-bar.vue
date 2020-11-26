
<template>
<el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  :router="true"
  @select="handleSelect"
  >
  <el-menu-item index="/">Home</el-menu-item>
  <el-menu-item index="/volunteer-app">Volunteerys</el-menu-item>
  <el-menu-item index="/volunteer-edit">Create</el-menu-item>
  <el-submenu index="2">
    <template slot="title">Organizations</template>
    <el-menu-item index="2-1">Show all</el-menu-item>
    <el-menu-item index="2-2">Create</el-menu-item> 
  </el-submenu>
  <el-menu-item index="3" disabled>User</el-menu-item>
  <el-menu-item index="/login">Login</el-menu-item>
</el-menu>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>