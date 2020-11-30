<template>
  <header class="app-header full main-container" :class="{scrolly:(scrollYposition > 20)}">
    <div class="hedear-container flex space-between">
      <div class="logo">
        <img
          src="@/assets/logo.svg"
          alt=""
          class="logo-img hover-pointer"
          @click="$router.push('/')"
        />
      </div>
      <navbar></navbar>
    </div>
  </header>
</template>

<script>
import navbar from "./element-ui/nav-bar";

export default {
  name: "app-header",
  data(){
    return{
      scrollYposition: 0
    }
  },
  components: {
    navbar,
  },
  created() {
   document.addEventListener("scroll", this.getScroll);
  },
  destroyed(){
    Document.removeEventListener("scroll", this.getScroll);
  },
  methods:{
    getScroll(){
      this.scrollYposition = window.scrollY;
    }
  }
};
</script>

<style>
</style>
