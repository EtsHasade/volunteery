<template>
  <header class="app-header full main-container">
    <!-- <section class="full-nav"> -->
      <div class="full-nav flex space-between">
        <div class="logo">
          <img src="@/assets/logo.svg" alt="" class="logo-img hover-pointer" @click="$router.push('/')" />
        </div>
        <navbar></navbar>
      </div>
    <!-- </section> -->
  </header>
</template>

<script>
import navbar from './element-ui/nav-bar';

export default {
  name: 'app-header',
  components:{
    navbar
  }
};
</script>

<style>
</style>
