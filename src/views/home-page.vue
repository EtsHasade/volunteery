<template>
  <div class="home">
    <h2>Home page</h2>
    <span>NEWS</span>
    <ul
      class="eventi-list clean-list card-list"
    >
      <eventi-preview
        v-for="eventi in newestEventis"
        :key="eventi._id"
        :eventi="eventi"
      />
    </ul>
    <span>POPULARS</span>
    <ul
      class="eventi-list clean-list card-list"
    >
      <eventi-preview
        v-for="eventi in popularestEventis"
        :key="eventi._id"
        :eventi="eventi"
      />
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

import eventiPreview from '../cmp/eventi-preview'
// import orgPreview from '../cmp/org-preview'
// import { eventiService } from '../service/eventi-service.js'
// import { orgService } from '../service/org-service.js'
// import { userService } from '../service/user-service.js'
export default {
  name: 'homePage',
  computed: {
    newestEventis() {
      var eventis = JSON.parse(JSON.stringify(this.$store.getters.eventisForDisplay)) 
      eventis.sort((a,b) => (a.createdAt > b.createdAt) ? 1 : -1);
      return eventis.splice(0,4)
    },
    popularestEventis() {
      var eventis = JSON.parse(JSON.stringify(this.$store.getters.eventisForDisplay)) 
      eventis.sort((a,b) => (a.rate > b.rate) ? 1 : ((b.rate > a.rate) ? -1 : 0));
      return eventis.splice(0,4)
    }
  },
  created() {
    this.$store.dispatch({ type: 'setEventis' })
  },
  components: {
    eventiPreview,
    // orgPreview
  }
}
</script>
