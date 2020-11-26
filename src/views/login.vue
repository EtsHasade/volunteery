<template>
    <div class="login-page">
        <section class="login">
        <h2>Login</h2>
            <input type="text" name="username" v-model="loginCred.username" placeholder="Username" />
            <input type="password" name="password" v-model="loginCred.password" placeholder="Password" />
            <button type="button" @click="login">Login</button>
        </section>
        <section class="signup">
            <h2>Sign-up</h2>
            <input type="text" name="username" v-model="signupCred.username" placeholder="Username" />
            <input type="password" name="password" v-model="signupCred.password" placeholder="Password" />
            <input type="email" name="email" v-model="signupCred.email" placeholder="baba@gmail.com" />
            <button type="button" @click="signup">Sign</button>
        </section>
    </div>
    
</template>

<script>
    import userService from '../service/user-service.js';

    export default {
        name: 'Login',
        data() {
            return {
                loginCred: {},
                signupCred: {},
            }
        },
        methods: {
            login() {
                if(!this.loginCred.username && !this.loginCred.password) {
                    if(this.loginCred.username == "" && this.loginCred.password == "") {
                        //check on usert list
                        this.$emit("authenticated", true);
                        this.$router.replace({ name: "secure" });
                    } else {
                        console.log("The username or password is incorrect");
                    }
                } else {
                    console.log("A username and password must be present");
                }
            },
            signup(){
                 if(!this.signupCred.username && !this.signupCred.password && !this.signupCred.email) {
                    userService.signup(this.signupCred);
                    console.log("Welcome!");
            } else {
                    console.log("The username or password or email is incorrect");
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
        margin-top: 200px;
        padding: 20px;
    }
</style>