<template>
    <div class="login-page">
        <h2>{{msg}}</h2>
        <section class="login">
            <h3>Login</h3>
            <form @submit.prevent="login">
                <br><input type="text" class="in username" name="username" v-model="loginCred.username" placeholder="Username" /><br>
                <br><input type="password" class="in password" name="password" v-model="loginCred.password" placeholder="Password" /><br>
                <button>Login</button>
            </form>
        </section>        
        <section class="signup">
            <h3>Sign-up</h3>
            <form @submit.prevent="signup">
                <br><input type="text" class="in username" name="username" v-model="signupCred.username" placeholder="Username" /><br>
                <br><input type="password" class="in password" name="password" v-model="signupCred.password" placeholder="Password" /><br>
                <br><input type="email" class="in email" name="email" v-model="signupCred.email" placeholder="baba@gmail.com" /><br>
                <br><input type="tel" class="in phone" name="phone" v-model="signupCred.tel" placeholder="012-345-6789"/><br>
                <br><select-multi class="in skill"></select-multi><br>
                <br><select-multi class="in fav"></select-multi><br>
                <br><gender-selector class="in "></gender-selector><br>
                <button type="button" @click="signup">Sign</button>
          </form>
        </section>
    </div>
    
</template>

<script>
import selectMulti from '@/cmp/element-ui/select-multi';
import genderSelector from '@/cmp/element-ui/gender-selector';

    export default {
        name: 'Login',
        data() {
            return {
                loginCred: {},
                signupCred: {},
                msg: '',
            }
        },
        components: {
            selectMulti,
            genderSelector
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