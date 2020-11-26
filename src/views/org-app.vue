<template>
  <main>
    <!-- <org-filter></org-filter> -->
    <org-list :orgs="orgsToShow"></org-list>
  </main>
</template>
 
<script>
// import orgFilter from "@/cmp/org-filter";
import orgList from "@/cmp/org-list";

export default {
  name: "orgApp",
  computed: {
    orgsToShow() {
      return this.$store.getters.orgsForDisplay
    }
  },
  created(){
      this.$store.dispatch({type: 'setOrgs'})
  },
  components: {
    // orgFilter,
    orgList,
  },
};
</script>

<style>
</style>