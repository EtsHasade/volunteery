<template>
  <section class="login flex column center text-center small-container">
    <el-button v-if="loggedinUser" @click="logout">Logout</el-button>
    <section v-else>
      <section class="login">
        <h3>Login</h3>
        <form @submit.prevent="login">
          <el-input
            v-model="loginCred.fullName"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = 'Username'"
            placeholder="Username"
            clearable
          ></el-input>
          <el-input
            v-model="loginCred.password"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = 'Password'"
            show-password
            placeholder="Password"
            clearable
          ></el-input>
          <!-- <br><input type="text" class="in username" name="username" v-model="loginCred.fullName" onfocus="this.placeholder = ''" placeholder="Username" /><br>
                      <br><input type="password" class="in password" name="password" v-model="loginCred.password" onfocus="this.placeholder = ''" placeholder="Password" /><br> -->
          <el-button @click="login">Login</el-button>
        </form>
      </section>
      <section class="signup">
        <h3>Sign-up</h3>
        <form @submit.prevent="signup" class="flex column center">
          <el-input
            v-model="signupCred.fullName"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = 'Username'"
            placeholder="Username"
            clearable
          ></el-input>
          <el-input
            v-model="signupCred.password"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = 'Password'"
            show-password
            placeholder="Password"
            clearable
          ></el-input>
          <el-input
            v-model="signupCred.email"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = 'baba@gmail.com'"
            placeholder="baba@gmail.com"
            clearable
          ></el-input>
          <el-input
            v-model="signupCred.tel"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = '012-345-6789'"
            placeholder="012-345-6789"
            clearable
          ></el-input>
          <!-- <br><input type="text" class="in username" name="username" v-model="signupCred.username" onfocus="this.placeholder = ''" placeholder="Username" /><br>
                      <br><input type="password" class="in password" name="password" v-model="signupCred.password" placeholder="Password" /><br> -->
          <!-- <br><input type="email" class="in email" name="email" v-model="signupCred.email" placeholder="baba@gmail.com" /><br>
                      <br><input type="tel" class="in phone" name="phone" v-model="signupCred.tel" placeholder="012-345-6789"/><br> -->
          <span>Select skills</span>
          <select-multi
            v-model="signupCred.skill"
            :items="neededs"
          ></select-multi>
          <span>Select favorites</span>
          <select-multi v-model="signupCred.fav" :items="tags"></select-multi>
          <gender-selector class="in"></gender-selector>
          <el-button>Sign</el-button>
        </form>
      </section>
    </section>
  </section>
</template>

<script>
import selectMulti from '@/cmp/element-ui/select-multi';
import genderSelector from '@/cmp/element-ui/gender-selector';

// import { userService } from '../service/user-service.js';
export default {
  name: 'Login',
  data() {
    return {
      // loggedinUser: this.$store.getters.loggedinUser,
      loginCred: {},
      signupCred: {}
      // tags: this.$store.getters.tags,
      // neededs: this.$store.getters.neededs
    }
  },
  components: {
    selectMulti,
    genderSelector,
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
    tags() {
      return this.$store.getters.tags
    },
    neededs() {
      return this.$store.getters.neededs
    }
  },
  methods: {
    async login() {
      if (this.loginCred.fullName && this.loginCred.password) {
        console.table('this.loginCred', this.loginCred);
        try {
          await this.$store.dispatch({ type: 'login', userCred: this.loginCred })
          this.$message({
            showClose: true,
            message: `${this.loginCred.fullName} loginned sucessfully!`,
            type: 'success',
            duration: 1500
          })
          this.loginCred = {};
        } catch (err) {
          this.$message({
            showClose: true,
            message: `Your user/password wrong, please try again.`,
            type: 'warning',
            duration: 1500
          })
        }
      } else {
        this.$message({
          showClose: true,
          message: `Username/Password must be present`,
          type: 'warning',
          duration: 1500
        })
        console.table('this.loginCred', this.loginCred);
      }
    },
    signup() {
      if (this.signupCred.fullName && this.signupCred.password && this.signupCred.email) {
        this.$store.dispatch({ type: 'signup', userCred: this.signupCred });
        this.signupCred = {};
        this.$message({
          showClose: true,
          message: `${this.signupCred.fullName} signup sucessfully!`,
          type: 'success',
          duration: 1500
        })
      } else {
        console.table('this.signupCred', this.signupCred);
        this.$message({
          showClose: true,
          message: `Some input is incorrect`,
          type: 'warning',
          duration: 1500
        })
      }
    },
    logout() {
     this.$store.dispatch({ type: 'logout' })
        this.$message({
          showClose: true,
          message: `${this.loggedinUser.fullName} logout sucessfully!`,
          type: 'success',
          duration: 1500
        })
    },
  }
}
</script>

<style scoped>
.login .singup {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 20px;
  padding: 20px;
}
/* h2 {
  margin-top: 10px;
  padding: 5px;
  border: solid 2px black;
  background-color: #69bd42;
  width: 300px;
} */
</style>