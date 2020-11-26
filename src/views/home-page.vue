<template>
  <div class="home">
    <h2>Home page</h2>
    <span>NEWS</span>
    <ul
      class="volunteer-list clean-list card-list"
    >
      <volunteer-preview
        v-for="volunteer in newestVolunteers"
        :key="volunteer._id"
        :eventi="volunteer"
      />
    </ul>
    <span>POPULARS</span>
    <ul
      class="volunteer-list clean-list card-list"
    >
      <volunteer-preview
        v-for="volunteer in popularestVolunteers"
        :key="volunteer._id"
        :eventi="volunteer"
      />
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

import volunteerPreview from '../cmp/volunteer-preview'
// import orgPreview from '../cmp/org-preview'
// import { volunteerService } from '../service/volunteer-service.js'
// import { orgService } from '../service/org-service.js'
// import { userService } from '../service/user-service.js'
export default {
  name: 'homePage',
  computed: {
    newestVolunteers() {
      var volunteers = JSON.parse(JSON.stringify(this.$store.getters.volunteersForDisplay)) 
      volunteers.sort((a,b) => (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0));
      console.log(volunteers);
      return volunteers.splice(0,4)
    },
    popularestVolunteers() {
      var volunteers = JSON.parse(JSON.stringify(this.$store.getters.volunteersForDisplay)) 
      volunteers.sort((a,b) => (a.rate > b.rate) ? 1 : ((b.rate > a.rate) ? -1 : 0));
      console.log(volunteers);
      return volunteers.splice(0,4)
    }
  },
  created() {
    this.$store.dispatch({ type: 'setVolunteers' })
  },
  components: {
    volunteerPreview,
    // orgPreview
  }
}
</script>
