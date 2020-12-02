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
        class="call-to-action"
        @click="scrollToList"
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
    scrollToList(){
      this.$emit('scrollToList');
    }
  },
};
</script>

<style>
</style>