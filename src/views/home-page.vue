<template>
  <div class="home-page full main-container">
    <!-- <h2>Home page</h2> -->
    <img class="hero-img full" src="@/assets/img/hero.jpg" alt="">
    <!-- <img class="hero-img full" src="https://ewscripps.brightspotcdn.com/dims4/default/61272c3/2147483647/strip/true/crop/640x360+0+34/resize/1280x720!/quality/90/?url=https%3A%2F%2Fmediaassets.10news.com%2Fphoto%2F2018%2F10%2F30%2Fvolunteer_900x600_1540924954704_101792658_ver1.0_640_480.jpg" alt=""> -->
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
    this.$store.dispatch({ type: 'setEventis' });

    document.body.classList.add('home-page');

  },
  destroyed(){
    document.body.classList.remove('home-page');
  },
  components: {
    eventiList,
    globalInfo,
    // orgPreview
  }
}
</script>
