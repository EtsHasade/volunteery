<template>
  <div class="home-page">
    <!-- <h2>Home page</h2> -->
    <!-- <img class="hero-img full" src="@/assets/img/hero.jpg" alt=""> -->
    <!-- <img class="hero-img full" src="https://ewscripps.brightspotcdn.com/dims4/default/61272c3/2147483647/strip/true/crop/640x360+0+34/resize/1280x720!/quality/90/?url=https%3A%2F%2Fmediaassets.10news.com%2Fphoto%2F2018%2F10%2F30%2Fvolunteer_900x600_1540924954704_101792658_ver1.0_640_480.jpg" alt=""> -->
    <eventi-filter @doFilter="routeToEventiFilter" />
    <section v-if="loggedinUser && loggedinUser.favs" class="suggested">
      <span>Suggest</span>
      <eventi-list :eventis="suggestEventis" />
    </section>
    <span>NEWS</span>
    <eventi-list :eventis="newestEventis" />
    <span>POPULARS</span>
    <eventi-list :eventis="popularestEventis" />
    <global-info />
  </div>
</template>

<script>
import eventiFilter from '../cmp/eventi-filter.vue';
// @ is an alias to /src

import eventiList from '../cmp/eventi-list'
// import eventiPreview from '../cmp/eventi-preview';
import globalInfo from '../cmp/global-info';
// import socketService from '../service/socket-service.js'

// import orgPreview from '../cmp/org-preview'
// import { eventiService } from '../service/eventi-service.js'
// import { orgService } from '../service/org-service.js'
// import { userService } from '../service/user-service.js'
export default {
  name: 'homePage',
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
    newestEventis() {
      var eventis = JSON.parse(JSON.stringify(this.$store.getters.eventisForDisplay))
      eventis.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
      return eventis.splice(0, 4)
    },
    popularestEventis() {
      var eventis = JSON.parse(JSON.stringify(this.$store.getters.eventisForDisplay))
      eventis.sort((a, b) => (a.rate > b.rate) ? -1 : ((b.rate > a.rate) ? 1 : 0));
      return eventis.splice(0, 4)
    },
    suggestEventis() {
      // if(!this.loggedinUser || !this.loggedinUser.favs) return
      var suggestEventis = []
      var suggestEventisArrays = []
      const favs = this.$store.getters.loggedinUser.favs
      var eventis = JSON.parse(JSON.stringify(this.$store.getters.eventisForDisplay))
      eventis.sort((a, b) => (a.rate > b.rate) ? -1 : ((b.rate > a.rate) ? 1 : 0));
      [...favs].forEach(fav => {
        let favEventis = [];
        [...eventis].forEach(eventi => {
          eventi.tags.forEach(eventTag => {
            if (eventTag === fav) {
              favEventis.push(eventi)
            }
          })
        })
        suggestEventisArrays.push(JSON.parse(JSON.stringify(favEventis)))
      })

      const arr = [0, 1, 2, 3]
      arr.forEach((num) => {
        var myIdx = num
        if (myIdx === suggestEventisArrays.length) myIdx = 0
        if (myIdx - 1 === suggestEventisArrays.length) myIdx = 1
        suggestEventis.push(suggestEventisArrays[myIdx].shift())
      })
      return suggestEventis
    }
  },
  methods: {
    routeToEventiFilter(filterBy){
      this.$router.push(`/eventi-app/?term=${filterBy.byText}&tag=${filterBy.byTags}`)
    }
  },
  created() {
    this.$store.dispatch({ type: 'setEventis' });
    document.body.classList.add('hero-page');
    // socketService.on("updatesEventi", (eventi) => {
    //   console.log('check');
    //   if(this.$store.getters.loggedinUser.org._id === eventi.byOrg._id) {
    //     this.$message({
    //       showClose: true,
    //       message: `someone review on ${eventi.title}`,
    //       type: "success",
    //       duration: 3000,
    //     });      
    //   }
    // })
  },
  destroyed() {
    document.body.classList.remove('hero-page');
  },
  components: {
    eventiList,
    globalInfo,
    eventiFilter,
    // orgPreview
  }
}
</script>
