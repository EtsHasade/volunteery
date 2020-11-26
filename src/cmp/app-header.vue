<template>
  <header class="app-header full main-container">
    <div class="flex space-between">
    <div class="logo">
      <img src="@/assets/logo.svg" alt="" class="logo-img " />
    </div>
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
