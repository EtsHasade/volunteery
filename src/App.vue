<template>
  <div id="app" class="main-container">
      <app-header></app-header>
      <hero/>
      <main class="mb10">
        <router-view />
      </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import "@/style/main.scss";
import appHeader from "@/cmp/app-header";
import appFooter from "@/cmp/app-footer";
import hero from "@/cmp/hero";

export default {
  name: "eventiApp",
  components: {
    appHeader,
    appFooter,
    hero
  },
};
</script>

<style lang="scss">
@font-face{
    font-family: regular;
    src: url(./assets/fonts/Hind/Hind-Regular.ttf);
}

.hero{
  background-image: url(./assets/img/hero.jpg);
}
</style>
