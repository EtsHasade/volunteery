<template>
  <section v-if="user" class="user-details">
    <h2>user details</h2>
    <avatar :src="user.imgUrl" />
    <h3>Name: {{ user.fullName }}</h3>
    <div class="skills clean-list mb10">
      <h3 class="mrg0">Skills:</h3>
      <section v-for="(skill, idx) in user.skills" :key="idx">
        {{ skill }}
      </section>
    </div>
    <div class="favs clean-list mb10">
      <h3 class="mrg0">Favorites:</h3>
      <section v-for="(fav, idx) in user.favorites" :key="idx">
        {{ fav }}
      </section>
    </div>
    <h3>My Events</h3>
    <eventi-list :eventis="eventis" />
  </section>
</template>

<script>
import eventiList from '../cmp/eventi-list'
import avatar from 'vue-avatar'
import { userService } from '../service/user-service.js'
export default {
  name: 'user-details',
  data() {
    return {
      user: null
    }
  },
  computed: {
    eventis() {
      // user.events.map(eventi=> {
      //       return await eventiService.getById(eventi._id)
      //   })
      return this.user.events.map(miniEventi => {
        console.log('miniEventi', miniEventi);
        console.log('this.$store.getters.eventisForDisplay', this.$store.getters.eventisForDisplay);
        return this.$store.getters.eventisForDisplay.find(
          (eventi) => {
            console.log('eventi', eventi);
            return eventi._id === miniEventi._id;
          })
      })
    }

  },
  async created() {
    this.$store.dispatch({ type: 'setEventis' })
    const id = this.$route.params.userId
    const user = await userService.getById(id)
    this.user = JSON.parse(JSON.stringify(user))
  },
  components: {
    avatar,
    eventiList
  }
}
</script>

<style>
</style>