
<template>
<el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  :router="true"
  @select="handleSelect"
  >
  <el-menu-item index="/">Home</el-menu-item>
  <el-menu-item index="/eventi-app">Eventiys</el-menu-item>
  <el-menu-item index="/eventi-edit">Create</el-menu-item>
  <el-submenu index="2">
    <template slot="title">Organizations</template>
    <el-menu-item index="/org-app">Show all</el-menu-item>
    <el-menu-item index="/org-edit">Create</el-menu-item> 
  </el-submenu>
  <el-menu-item :index="`/user-details/${loggedinUser._id}`" :disabled="!loggedinUser" >User</el-menu-item>
  <el-menu-item index="/login">Login</el-menu-item>
</el-menu>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    computed: {
      loggedinUser() {
        return this.$store.getters.loggedinUser
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>