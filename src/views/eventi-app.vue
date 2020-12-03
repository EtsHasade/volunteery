<template>
  <main>
    <eventi-filter @doFilter="setFilter" ref="thefilter" :initfilterBy="filterBy"></eventi-filter>
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
      filterBy: null,
    };
  },
  computed: {
    eventisToShow() {
      const eventis = this.$store.getters.eventisForDisplay;
      if (!this.filterBy) return eventis;
      let eventisFilter = eventis;
      if (this.filterBy.byText) {
        const txt = this.filterBy.byText.toLowerCase();

        eventisFilter = eventis.filter((eventi) => {
          return (
            eventi.title.toLowerCase().includes(txt) ||
            eventi.desc.toLowerCase().includes(txt)
          );
        });

        const terms = txt.split(" ");
        const splitTermEventis = eventis.filter((currEventi) => {
          const match = terms.filter((term) => {
            return (
              currEventi.title.toLowerCase().includes(term) ||
              currEventi.desc.toLowerCase().includes(term)
            );
          });
          return match.length === terms.length;
        });

        eventisFilter = eventisFilter.concat(splitTermEventis);
        eventisFilter = eventisFilter.reduce((acc, currEventi) => {
          if (!acc.includes(currEventi)) acc.push(currEventi);
          return acc;
        }, []);
        eventisFilter = JSON.parse(JSON.stringify(eventisFilter));
        console.log(
          "🚀 ~ file: eventi-app.vue ~ line 48 ~ eventisFilter=eventisFilter.reduce ~ eventisFilter",
          eventisFilter
        );
      }

      if (this.filterBy.byTags.length && this.filterBy.byTags[0] !== '') {
        console.log("by tags");

        var eventisfilterTags = [];
        this.filterBy.byTags.forEach((tag) => {
          var eventisfilterTag = [];
          eventisFilter.forEach((eventi) => {
            if (eventi.tags.includes(tag)) {
              eventisfilterTag.push(eventi);
            }
          });
          eventisfilterTags = eventisfilterTags.concat(eventisfilterTag);
        });
        eventisFilter = JSON.parse(JSON.stringify(eventisfilterTags));
      }
      return eventisFilter;
    },
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
  },
  created() {},
  async mounted() {
    this.$store.dispatch({ type: "setEventis" });
    this.$refs.thefilter.$refs.searchFild.focus();


    // if (this.$route.query.term || this.$route.query.tag) {
    //   this.filterBy = {};
    //   this.filterBy.byText = this.$route.query.term;
    //   this.filterBy.byTags = this.$route.query.tag.split(',');
    // }
  },
  components: {
    eventiFilter,
    eventiList,
  },
};
</script>

<style>
</style>