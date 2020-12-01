<template>
  <div class="hero full">
    <div class="title flex-column">
      <h1>Looking to do good?</h1>
      <h3>Togather, we build better world</h3>
      <p>
        Want to volunteer in your own style and according to your unique
        talents?
      </p>
      <p>We invite you to choose the volunteering that best suits you.</p>
      <h4 ref="scrollToList" class="call-to-action" @click="scrollMeTo('scrollToList')">See our suggestions</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "hero",
  methods: {
    scrollMeTo(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
  },
};
</script>

<style>
</style>