<template>
  <main>
    <volunteer-filter @doFilter="setFilter"></volunteer-filter>
    <section class="btns-tags flex center mb10">
      <el-button @click="filterBy = {byTitle: '',byTags: ['COVID-19']}">COVID-19</el-button>
      <el-button @click="filterBy = {byTitle: '',byTags: ['animals']}">Animals</el-button>
      <el-button @click="filterBy = {byTitle: '',byTags: ['Needy']}">Needy</el-button>
    </section>
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
        var volunteersfilterTags = []
        this.filterBy.byTags.forEach(tag => {
          var volunteersfilterTag = []
          volunteersFilter.forEach(volunteer => {
            if (volunteer.tags.includes(tag)) {
              volunteersfilterTag.push(volunteer)
            }
          })
          volunteersfilterTags = volunteersfilterTags.concat(volunteersfilterTag)
          console.log(volunteersfilterTags);
        })
        volunteersFilter = JSON.parse(JSON.stringify(volunteersfilterTags))
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