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
      return this.$store.getters.orgsForDisplay;
    },
  },
  async created() {
    this.$store.dispatch({ type: "setEventis" });
    // if(!resEventis.type) {
    //   this.$message({
    //     showClose: true,
    //     message: `Events cant set, err ${resEventis.err.code}`,
    //     type: 'warning',
    //     duration: 3000
    //   })
    // }
    this.$store.dispatch({ type: "setOrgs" });
    // if (resOrgs.type) {
    //   this.$message({
    //     showClose: true,
    //     message: `Organizations set sucessfully!`,
    //     type: 'success',
    //     duration: 3000
    //   })
    // } else {
    //   this.$message({
    //     showClose: true,
    //     message: `Organizations cant set, err ${resOrgs.err.code}`,
    //     type: 'warning',
    //     duration: 3000
    //   })
    // }
  },
  components: {
    // orgFilter,
    orgList,
  },
};
</script>

<style>
</style>