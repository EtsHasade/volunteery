<template>
  <header class="app-header full main-container">
    <div class="flex">
    <div class="logo">
      <img src="@/assets/logo.svg" alt="" class="logo-img " />
    </div>
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/volunteer-app">Volunteers</router-link> |
      <router-link to="/volunteer-edit">Create Volunteer</router-link> |
      <router-link to="/login">Login</router-link> |
    </nav> -->
    <navbar></navbar>
    </div>
  </header>
</template>

<script>
import navbar from './element-ui/nav-bar'

export default {
  name: 'app-header',
  components:{
    navbar
  }
};
</script>

<style>
</style>
