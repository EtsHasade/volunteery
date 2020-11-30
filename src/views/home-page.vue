<template>
  <div class="home-page">
    <h2>Home page</h2>
    <span>NEWS</span>
    <eventi-list :eventis="newestEventis" />
    <span>POPULARS</span>
    <eventi-list :eventis="popularestEventis" />
    <global-info />
  </div>

</template>

<script>
// @ is an alias to /src

import eventiList from '../cmp/eventi-list'
// import eventiPreview from '../cmp/eventi-preview';
import globalInfo from '../cmp/global-info';

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
    eventiList,
    globalInfo,
    // orgPreview
  }
}
</script>
