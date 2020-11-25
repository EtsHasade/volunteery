<template>
  <main>
    <volunteer-filter></volunteer-filter>
    <volunteer-list :eventis="eventisToShow"></volunteer-list>
  </main>
</template>
 
<script>
import volunteerFilter from "@/cmp/volunteer-filter";
import volunteerList from "@/cmp/volunteer-list";

export default {
  name: "voluteerApp",
  computed: {
    eventisToShow() {
      return this.$store.getters.volunteersForDisplay
    }
  },
  created(){
      this.$store.dispatch({type: 'setVolunteers'})
  },
  components: {
    volunteerFilter,
    volunteerList,
  },
};
</script>

<style>
</style>