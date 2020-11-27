<template>
  <main>
    <volunteer-filter @doFilter="setFilter"></volunteer-filter>
    <volunteer-list :eventis="eventisToShow"></volunteer-list>
  </main>
</template>
 
<script>
import volunteerFilter from "@/cmp/volunteer-filter";
import volunteerList from "@/cmp/volunteer-list";

export default {
  name: "voluteerApp",
  data() {
    return {
      filterBy: null
    }
  },
  computed: {
    eventisToShow() {
      const volunteers = this.$store.getters.volunteersForDisplay
      if (!this.filterBy) return volunteers
      var volunteersFilter = []
      volunteersFilter = JSON.parse(JSON.stringify(volunteers))
      if (this.filterBy.byTitle != '') {
        const txt = this.filterBy.byTitle.toLowerCase();
        volunteersFilter = volunteersFilter.filter(volunteer => volunteer.title.toLowerCase().includes(txt));
      }
      if (this.filterBy.byTags.length) {
        var filterTags = []
        this.filterBy.byTags.forEach(tag => {
        console.log(tag);
        filterTags += volunteersFilter.map(volunteer => {
          console.log(volunteer.tags.includes(tag));
          return volunteer.tags.includes(tag)
        })
        console.log(filterTags);
        volunteersFilter = JSON.parse(JSON.stringify(filterTags))
        })
      }
      return volunteersFilter
    }
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy
    }
  },
  created() {
  },
  mounted() {
    this.$store.dispatch({ type: 'setVolunteers' })

  },
  components: {
    volunteerFilter,
    volunteerList,
  },
};
</script>

<style>
</style>