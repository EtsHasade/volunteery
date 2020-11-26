<template>
  <div id="app" class="main-container">
      <app-header></app-header>
    <!-- <header class="full">
    </header> -->
    <main>
      <router-view />
    </main>
    <footer class="full">
      <app-footer></app-footer>
    </footer>
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
