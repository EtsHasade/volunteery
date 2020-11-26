<template>
  <div id="app" class="main-container">
    <app-header></app-header>
    <router-view />
    <app-footer></app-footer>
  </div>
</template>

<script>
import '@/style/main.scss'
import appHeader from "@/cmp/app-header";
import appFooter from "@/cmp/app-footer";


export default {
  name: "volunteerApp",
  components: {
    appHeader,
    appFooter,
  },
};
</script>

<style lang="scss">
</style>
