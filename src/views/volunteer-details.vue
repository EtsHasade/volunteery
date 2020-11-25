<template>
  <section class="volunteer-details">
    <img class="volunteer-img" src="" alt="" srcset="" />
    <section class="details">
        <img class="img-organization" src="" alt="" srcset="">
        
    </section>
  </section>
</template>

<script>
import { volunteerService } from '../service/volunteer-service.js';
export default {
  name: 'volunteer-details',
  data() {
    return {
      volunteer: null,
    }
  },
  async created() {
    const id = this.$route.params.volunteerId
    const volunteer = await volunteerService.getById(id)
    this.volunteer = JSON.parse(JSON.stringify(volunteer))
  }
}
</script>

<style>
</style>