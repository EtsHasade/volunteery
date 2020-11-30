<template>
  <section class="full main-container text-center">
    <h2>Global info</h2>
    <div class="flex mrg5 details-container">
      <section class="orgs">
        <i class="far fa-building"></i>
        <h3>{{orgsNum}} Organization that work hard only to make good Volunteerings</h3>
      </section>
      <section class="eventis">
        <i class="fas fa-hands-helping"></i>
        <h3>{{eventisNum}} Events of amazing Volunteerings</h3>
      </section>
      <section class="eventis">
        <i class="fas fa-users"></i>
        <h3>{{usersNum}} users that only make the world to be a good place!</h3>
      </section>
    </div>
  </section>
</template>

<script>

export default {
  name: 'globalInfo',
  computed: {
    orgsNum() {
      return this.$store.getters.orgsForDisplay.length
    },
    eventisNum() {
      return this.$store.getters.eventisForDisplay.length
    },
    usersNum() {
      this.$store.dispatch({ type: 'loadUsers' })
      return this.$store.getters.users.length
    },
  },
  components: {

  }

}
</script>

<style>
</style>