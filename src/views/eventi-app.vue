<template>
  <main>
    <eventi-filter
      @doFilter="setFilter"
      ref="thefilter"
      :initfilterBy="filterBy"
    ></eventi-filter>
    <eventi-list :eventis="eventisToShow"></eventi-list>
  </main>
</template>
 
<script>
import eventiFilter from "@/cmp/eventi-filter";
import eventiList from "@/cmp/eventi-list";
import socketService from "@/service/socket-service.js";


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
      console.log("🚀 ~ file: eventi-app.vue ~ line 28 ~ eventisToShow ~ this.filterBy", this.filterBy)
      if (!this.filterBy) return eventis;
      let eventisFilter = eventis;

      if (this.filterBy.byText) {
        const txt = this.filterBy.byText.toLowerCase();

        eventisFilter = eventis.filter((eventi) => {
          return (
            eventi.title.toLowerCase().includes(txt) ||
            eventi.desc.toLowerCase().includes(txt) ||
            eventi.byOrg.name.toLowerCase().includes(txt) ||
            eventi.location.country.toLowerCase().includes(txt) ||
            eventi.location.address.toLowerCase().includes(txt)
          );
        });

        const terms = txt.split(" ");
        const splitTermEventis = eventis.filter((currEventi) => {
          const match = terms.filter((term) => {
            return (
              currEventi.title.toLowerCase().includes(term) ||
              currEventi.desc.toLowerCase().includes(term) ||
              currEventi.byOrg.name.toLowerCase().includes(txt) ||
              currEventi.location.country.toLowerCase().includes(txt) ||
              currEventi.location.address.toLowerCase().includes(txt)
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
          "🚀 ~ file: eventi-app.vue ~ line 66 ~ eventisFilter=eventisFilter.reduce ~ eventisFilter",
          eventisFilter
        );
      }

      // if (this.filterBy.byTags.length && this.filterBy.byTags[0] !== "") {
      //   console.log("by tags");

        // let eventisfilterTags = [];
        // this.filterBy.byTags.forEach((tag) => {
        //   let eventisfilterTag = [];
        //   eventisFilter.forEach((eventi) => {
        //     if (eventi.tags.includes(tag)) {
        //       eventisfilterTag.push(eventi);
        //     }
        //   });
        //   eventisfilterTags = eventisfilterTags.concat(eventisfilterTag);
        // });
        
        if (this.filterBy.byKey.values.length && !this.filterBy.byKey.values.includes('') && !this.filterBy.byKey.values.includes('all')) {
        console.log("🚀 ~ file: eventi-app.vue ~ line 87 ~ eventisToShow ~ this.filterBy.byKey", this.filterBy.byKey)
          
          const eventisfilterKeys = eventisFilter.filter((eventi) => {
            if (eventi[this.filterBy.byKey.key]) {
            console.log("🚀 ~ file: eventi-app.vue ~ line 91 ~ eventisfilterKeys ~ eventi[this.filterBy.byKey.key]", eventi[this.filterBy.byKey.key])
              
              const eventiValues = eventi[this.filterBy.byKey.key];
              return this.filterBy.byKey.values.filter(value =>{
                return eventiValues.includes(value)
              }).length;
            } else {
              const translateFilter = {country: 'location', name: 'byOrg', food: 'accommodation', lodging: 'accommodation'}
              const eventiValue = eventi[translateFilter[this.filterBy.byKey.key]][this.filterBy.byKey.key];
              if(typeof eventiValue === 'string') return this.filterBy.byKey.values.includes(eventiValue);
              else if(typeof eventiValue === 'boolean') return this.filterBy.byKey.values.includes(JSON.stringify(eventiValue));
            }
          });

        console.log("🚀 ~ file: eventi-app.vue ~ line 105 ~ eventisfilterKeys ~ eventisfilterKeys", eventisfilterKeys)
        eventisFilter = JSON.parse(JSON.stringify(eventisfilterKeys));
        }
        // eventisfilterTags = eventisfilterTags.concat(eventisfilterTag);
      // if (
      //   this.filterBy.byKeys &&
      //   this.filterBy.byKeys.length &&
      //   this.filterBy.byKeys[0] !== ""
      // ) {
      //   console.log("by Keys");

      //   let eventisfilterKeys = [];
      //   this.filterBy.byKeys.forEach((fild) => {
      //     let eventisfilterKey = [];
      //     eventisFilter.forEach((eventi) => {
      //       if (eventi[fild.key].includes(fild.value)) {
      //         eventisfilterKey.push(eventi);
      //       }
      //     });

      //     eventisfilterKeys = eventisfilterKeys.concat(eventisfilterKey);
      //   });
      //   eventisFilter = JSON.parse(JSON.stringify(eventisfilterKeys));
      // }
      // /////////////
      return eventisFilter;
    },
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
  },
  async mounted() {
    this.$store.dispatch({ type: "setEventis" });
    this.$refs.thefilter.$refs.searchFild.focus();
    socketService.on("updatesEventi", (eventi) => {
      this.$store.dispatch({ type: "saveEventi", eventi});
      this.$store.dispatch({ type: "setEventis" });
    });
  },
  components: {
    eventiFilter,
    eventiList,
  },
};
</script>

<style>
</style>