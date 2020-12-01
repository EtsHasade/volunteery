<template>
  <div class="hero full">
    <div class="title flex-column">
      <h1>Looking for something meaningful?</h1>
      <h3>Togather, we'll build better world</h3>
      <p>
        Do you want to volunteer your way and according by your unique talents?
      </p>
      <p>We invite you to choose the volunteering that best suits you.</p>
      <h4
        ref="scrollToList"
        class="call-to-action"
        @click="scrollMeTo('scrollToList', 43)"
      >
        See our suggestions
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "hero",
  methods: {
    scrollMeTo(refName, topOffset) {
      var element = this.$refs[refName];
      var top = element.offsetTop + (window.innerHeight)*(topOffset/100);
      window.scrollTo(0, top);
    },
  },
};
</script>

<style>
</style>