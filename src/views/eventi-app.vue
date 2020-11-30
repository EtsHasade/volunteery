<template>
  <main>
    <eventi-filter @doFilter="setFilter"></eventi-filter>
    <section class="btns-tags flex center mb10">
      <el-button @click="filterBy = { byTitle: '', byTags: ['COVID-19'] }"
        >COVID-19</el-button
      >
      <el-button @click="filterBy = { byTitle: '', byTags: ['animals'] }"
        >Animals</el-button
      >
      <el-button @click="filterBy = { byTitle: '', byTags: ['Needy'] }"
        >Needy</el-button
      >
    </section>
    <eventi-list :eventis="eventisToShow"></eventi-list>
  </main>
</template>
 
<script>
import eventiFilter from "@/cmp/eventi-filter";
import eventiList from "@/cmp/eventi-list";

export default {
  name: "voluteerApp",
  data() {
    return {
      filterBy: null
    }
  },
  computed: {
    eventisToShow() {
      const eventis = this.$store.getters.eventisForDisplay
      if (!this.filterBy) return eventis
      var eventisFilter = []
      eventisFilter = JSON.parse(JSON.stringify(eventis))
      if (this.filterBy.byTitle != '') {
        const txt = this.filterBy.byTitle.toLowerCase();
        eventisFilter = eventisFilter.filter(eventi => eventi.title.toLowerCase().includes(txt));
      }
      if (this.filterBy.byTags.length) {
        var eventisfilterTags = []
        this.filterBy.byTags.forEach(tag => {
          var eventisfilterTag = []
          eventisFilter.forEach(eventi => {
            if (eventi.tags.includes(tag)) {
              eventisfilterTag.push(eventi)
            }
          })
          eventisfilterTags = eventisfilterTags.concat(eventisfilterTag)
        })
        eventisFilter = JSON.parse(JSON.stringify(eventisfilterTags))
      }
      return eventisFilter
    }
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy
    }
  },
  created() {
  },
  async mounted() {
    this.$store.dispatch({ type: "setEventis" });
  },
  components: {
    eventiFilter,
    eventiList,
  },
};
</script>

<style>
</style>