<template>
    <section class="login flex column center text-center small-container">
        <h2>{{msg}}</h2>
        <section class="login">
            <h3>Login</h3>
            <form @submit.prevent="login">
                <el-input v-model="loginCred.username" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Username'"  placeholder="Username"  clearable></el-input>
                <el-input v-model="loginCred.password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'" show-password placeholder="Password" clearable></el-input>
                <!-- <br><input type="text" class="in username" name="username" v-model="loginCred.username" onfocus="this.placeholder = ''" placeholder="Username" /><br>
                <br><input type="password" class="in password" name="password" v-model="loginCred.password" onfocus="this.placeholder = ''" placeholder="Password" /><br> -->
                <el-button>Login</el-button>
            </form>
        </section>        
        <section class="signup">
            <h3>Sign-up</h3>
            <form @submit.prevent="signup" class="flex column center">
                <el-input v-model="signupCred.username" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Username'" placeholder="Username"  clearable></el-input>
                <el-input v-model="signupCred.password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'" show-password placeholder="Password" clearable></el-input>
                <el-input v-model="signupCred.email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'baba@gmail.com'" placeholder="baba@gmail.com" clearable></el-input>
                <el-input v-model="signupCred.tel" onfocus="this.placeholder = ''" onblur="this.placeholder = '012-345-6789'" placeholder="012-345-6789" clearable></el-input>
                <!-- <br><input type="text" class="in username" name="username" v-model="signupCred.username" onfocus="this.placeholder = ''" placeholder="Username" /><br>
                <br><input type="password" class="in password" name="password" v-model="signupCred.password" placeholder="Password" /><br> -->
                <!-- <br><input type="email" class="in email" name="email" v-model="signupCred.email" placeholder="baba@gmail.com" /><br>
                <br><input type="tel" class="in phone" name="phone" v-model="signupCred.tel" placeholder="012-345-6789"/><br> -->
                <span>Select skills</span>
                <select-multi v-model="signupCred.skill" :items="neededs"></select-multi>
                <span>Select favorites</span>
                <select-multi v-model="signupCred.fav" :items="tags"></select-multi>
                <gender-selector class="in "></gender-selector>
                <el-button>Sign</el-button>
          </form>
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
                loginCred: {},
                signupCred: {},
                msg: '',
                tags: this.$store.getters.tags,
                neededs: this.$store.getters.neededs
            }
        },
        components: {
            selectMulti,
            genderSelector,
            // userService
        },
        methods: {
            async login() {
                if(this.loginCred.username && this.loginCred.password) {
                    console.table('this.loginCred',this.loginCred);
                    try {
                        await this.$store.dispatch({ type: 'login', userCred: this.loginCred })
                        this.loginCred = {};
                        this.msg = 'loging now';
                    } catch (err) {
                        this.msg = 'Your user/password wrong, please try again.';
                    }
                } else {
                    console.table('this.loginCred',this.loginCred);
                    return this.msg = 'A username and password must be present';
                }
            },
            signup(){
                 if(this.signupCred.username && this.signupCred.password && this.signupCred.email) {
                    this.$store.dispatch({ type: 'signup', userCred: this.signupCred });
                    this.signupCred = {};
                    return this.msg = 'Welcome!';
            } else {
                    console.table('this.signupCred',this.signupCred);
                    return this.msg = 'Some input is incorrect';
                }
            }
         }
    }
</script>

<style scoped>
    .login .singup{
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 20px;
        padding: 20px;
    }
    h2{
        margin-top: 10px;
        padding: 5px;
        border: solid 2px black;
        background-color: #69BD42;
        width: 300px;    
    }

</style>