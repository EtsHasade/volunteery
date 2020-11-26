<template>
    <div class="login-page">
        <section class="login">
        <h1>Login</h1>
            <input type="text" name="username" v-model="input.username" placeholder="Username" />
            <input type="password" name="password" v-model="input.password" placeholder="Password" />
            <section type="button" @click="login">Login</section>
        </section>
        <section class="signup">
            <h1>Sign-up</h1>
            <input type="text" name="username" v-model="input.username" placeholder="Username" />
            <input type="password" name="password" v-model="input.password" placeholder="Password" />
            <input type="email" name="email" v-model="input.email" placeholder="baba@gmail.com" />
            <section type="button" @click="signup">Sign</section>
        </section>
    </div>
    
</template>

<script>
    import userService from '../service/user-service.js';

    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                if(!this.input.username && !this.input.password) {
                    if(this.input.username == "" && this.input.password == "") {
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
                 if(!this.input.username && !this.input.password && !this.input.email) {
                    userService.signup(this.input);
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