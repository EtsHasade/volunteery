<template>
  <section class="volunteer-details">
    <img class="volunteer-img" :src="volunteer.imgUrls[0]" alt="" srcset="" />
    <main>
    <section class="details">
      <span>{{ volunteer.name }}</span>
      <section class="mini-org">
        <img class="img-org" :src="volunteer.byOrg.imgUrl" alt="" />
        <span>By {{ volunteer.byOrg.name }}</span>
      </section>
      <span>{{volunteer.location.country}} {{volunteer.location.address}}</span>
      <span>{{colunteer.desc}}</span>
      <section class="reviews">
        <section class="review" v-for="review in volunteer.review" :key="review._id">
            <img class="img-review" :src="review.author.imgUrl" alt="" srcset=""> 
            <span class="name-review">{{review.author.fullName}}</span>
            <span class="txt-review">{{review.txt}}</span>
            <span class="review-rate">Rate: {{review.rate}}</span>
        </section>
      </section>
    </section>
    <section></section>
    </main>
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