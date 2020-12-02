<template>
  <div id="app" class="main-container">
      <app-header ></app-header>
      <hero @scrollToList="scrollMeTo('appList')" />
      <main ref="appList" class="mb10">
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
  methods:{
      scrollMeTo(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;
      window.scrollTo(0, top-80);
    },
  }
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

@font-face{
    font-family: hindBold;
    src: url(./assets/fonts/Hind/Hind-Bold.ttf);
}
</style>
