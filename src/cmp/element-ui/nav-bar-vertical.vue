
<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    mode="vertical"
    :router="true"
  >
    <!--  -->
    <el-submenu index="1" class="hamburger">
      <template slot="title" class="hamburger"> ⩸ </template>
          <el-submenu index="2" class="user-menu">
      <template slot="title" class="user-menu">
        <span><i class="fas fa-user-circle"></i></span>
      </template>
      <el-menu-item :index="`/user-details/${userId}`" :disabled="!loggedinUser"
        >User profile</el-menu-item
      >
      <el-menu-item v-if="loggedinUser" @click="logout">Logout</el-menu-item>
      <el-menu-item v-if="!loggedinUser" index="/login">Login</el-menu-item>
      <el-menu-item v-if="!loggedinUser" index="/login">SignUp</el-menu-item>
    </el-submenu>

      <el-menu-item index="/eventi-app">Volunteerings</el-menu-item>
      <el-menu-item index="/org-app">Organizations</el-menu-item>
      <el-menu-item v-if="loggedinUser && loggedinUser.org" index="/eventi-edit">Publish new Event</el-menu-item>
      <el-menu-item v-else index="/org-edit">I need volunteers</el-menu-item>
    </el-submenu>
    <!--  -->
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
  methods: {
    logout() {
      this.$store.dispatch({ type: "logout" });
      this.$message({
        showClose: true,
        message: `${this.loggedinUser.fullName} logout sucessfully!`,
        type: "success",
        duration: 1500,
      });
    },
    // handleSelect(key, keyPath) {
    //   console.log(key, keyPath);
    // }
  },
};
</script>