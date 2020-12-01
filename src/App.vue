<template>
  <div id="app" class="main-container">
      <app-header></app-header>
      <main class="mb10 full main-container">
        <router-view />
      </main>
    <app-footer></app-footer>
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
@font-face{
    font-family: regular;
    src: url(./assets/font/Hind/Hind-Regular.ttf);
}
</style>
