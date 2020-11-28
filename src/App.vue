<template>
  <div id="app" class="main-container">
    <!-- <header class="full"> -->
      <app-header></app-header>
      <!-- </header> -->
      <main class="mb10">
        <router-view />
      </main>
    <!-- <footer class="full"> -->
    <app-footer></app-footer>
    <!-- </footer> -->
  </div>
</template>

<script>
import "@/style/main.scss";
import appHeader from "@/cmp/app-header";
import appFooter from "@/cmp/app-footer";

export default {
  name: "eventiApp",
  components: {
    appHeader,
    appFooter,
  },
};
</script>

<style lang="scss">
</style>
