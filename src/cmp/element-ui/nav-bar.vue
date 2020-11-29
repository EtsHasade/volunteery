
<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :router="true"
  >
    <el-menu-item index="/">Home</el-menu-item>
    <el-submenu index="1">
      <template slot="title">Explore</template>
      <el-menu-item index="/eventi-app">All volunteer events</el-menu-item>
      <el-menu-item index="/org-app">All Organizations</el-menu-item>
    </el-submenu>
      <el-menu-item v-if="!loggedinUser.org" index="/org-edit">I need volunteers</el-menu-item>
      <el-menu-item v-else index="/eventi-edit">Publish new Event</el-menu-item>
    <el-menu-item :index="`/user-details/${userId}`" :disabled="!loggedinUser"
      >User</el-menu-item
    >
    <el-menu-item index="/login">Login</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
    };
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    userId() {
      return this.loggedinUser ? this.loggedinUser._id : "0";
    },
  },
  // methods: {
  //   handleSelect(key, keyPath) {
  //     console.log(key, keyPath);
  //   }
  // }
};
</script>