<template>
  <section v-if="volunteer" class="volunteer-details">
    <section class="volunteer-imgs">
      <img
        class="volunteer-img"
        v-for="(img, idx) in volunteer.imgUrls"
        :key="idx"
        :src="img"
      />
    </section>
    <main class="flex">
      <section class="details flex column">
        <h2>{{ volunteer.title }}</h2>
        <section class="mini-org">
          <avatar :src="volunteer.byOrg.imgUrl" />
          <!-- <img class="img-org mini-img" :src="volunteer.byOrg.imgUrl" alt="" /> -->
          <span>By {{ volunteer.byOrg.name }}</span>
        </section>
        <span
          >{{ volunteer.location.address }},
          {{ volunteer.location.country }}</span
        >
        <rate-stars v-if="volunteer.reviews.length" v-model="volunteer.rate" />
        <!-- <span v-if="volunteer.reviews.length">{{ volunteer.rate }} Stars</span> -->
        <span v-else>{{ msg }}</span>
        <span>Tags:</span>
        <section class="tags flex wrap">
          <span
            class="tag text-center mrg5"
            v-for="(tag, idx) in volunteer.tags"
            :key="idx"
            >{{ tag }}</span
          >
        </section>
        <span>Limit: {{ volunteer.capacity }} members</span>
        <section class="dates flex column">
          <span>date start: {{ timeToPresent(volunteer.startAt) }}</span>
          <span v-if="volunteer.endAt"
            >date end: {{ timeToPresent(volunteer.endAt) }}</span
          >
        </section>
        <section class="neededs">
          <span>We need for this volunteer:</span>
          <ul class="needed-content clean-list flex wrap">
            <li
              class="needed text-center mrg5"
              v-for="(needed, idx) in volunteer.neededs"
              :key="idx"
            >
              {{ needed }}
            </li>
          </ul>
        </section>
        <span>{{ volunteer.desc }}</span>
        <span class="text-center mrg5">Reviews</span>
        <form
          @submit.prevent="addReview"
          class="add-review flex center text-center"
        >
          <el-input type="text" v-model="reviewToEdit.txt" name="review" />
          <el-button>Add review</el-button>
          <rate-stars-enable v-model="reviewToEdit.rate" />
        </form>

        <section class="reviews flex column">
          <section
            class="review flex column mrg5"
            v-for="review in volunteer.reviews"
            :key="review._id"
          >
            <section class="details-review flex">
              <avatar :src="review.author.imgUrl"></avatar>
              <rate-stars v-model="review.rate" class="review-rate" />
            </section>
            <section class="content-review flex center text-center">
              <span class="time mrg5">{{
                timeToPresent(review.createdAt)
              }}</span>
              <span class="name-review mrg5">{{ review.author.fullName }}</span>
              <span class="txt-review">{{ review.txt }}</span>
            </section>
          </section>
        </section>
      </section>
      <section class="status-details text-center">
        <el-button class="join-btn" @click="addMember">{{ textBtn }}</el-button>
        <section class="members">
          <span class="flex center">Members</span>
          <section class="members-imgs flex wrap">
            <avatar
              class="member-img mrg5"
              v-for="member in volunteer.members"
              :key="member._id"
              :src="member.imgUrl"
              :title="member.fullName"
            />
          </section>
        </section>
      <router-link type="success" class="el-button el-button--success" :to="'/volunteer-edit/'+volunteer._id">Edit</router-link>
      </section>
    </main>
  </section>
</template>

<script>
import { volunteerService } from '../service/volunteer-service.js';
import { userService } from '../service/user-service.js';
import avatar from "vue-avatar";
import rateStars from '../cmp/element-ui/rate-stars';
import rateStarsEnable from '../cmp/element-ui/rate-stars-enable';

export default {
  name: 'volunteer-details',
  data() {
    return {
      volunteer: null,
      reviewToEdit: { author: {}, txt: '', rate: 5 },
      miniLoggedinUser: null,
      miniVolunteer: null,
      textBtn: 'Join us!',
      msg: 'no Rates',
      //   avgRate: null
      //   startDate: null,
      //   endDate: null
    }
  },
  methods: {
    timeToPresent(time) {
      return volunteerService.timeAgo(time)
    },
    avgRates() {
      if (this.volunteer.reviews.length === 1) {
        this.volunteer.rate = this.volunteer.reviews[0].rate
      }
      var sum = 0
      this.volunteer.reviews.forEach(review => {
        sum += review.rate
      })
      this.volunteer.rate = sum / this.volunteer.reviews.length
      // return sum / this.volunteer.reviews.length
    },
    async addMember() {
      if (this.volunteer.members.find(member => member._id === this.miniLoggedinUser._id)) return
      //   const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser))
      const user = await userService.getById('u101')
      this.volunteer.members.push(this.miniLoggedinUser)
      volunteerService.save(JSON.parse(JSON.stringify(this.volunteer)))
      user.events.push(JSON.parse(JSON.stringify(this.miniVolunteer)))
      userService.update(user)
      this.textBtn = 'Your already join'
    },
    addReview() {
      this.reviewToEdit.rate = Number(this.reviewToEdit.rate)
      this.reviewToEdit.createdAt = Date.now()
      this.reviewToEdit._id = volunteerService.makeId()
      this.reviewToEdit.author = JSON.parse(JSON.stringify(this.miniLoggedinUser))
      this.volunteer.reviews.push(this.reviewToEdit)
      volunteerService.save(JSON.parse(JSON.stringify(this.volunteer)))
      this.reviewToEdit = { author: {}, txt: '', rate: 5 }
      this.avgRates()
    },
    // getAvgRate() {
    //     this.avgRate = [...this.volunteer.reviews].reduce((a, b) => (a.rate + b.rate)) / this.volunteer.reviews.length
    //     console.log(this.avgRate);
    // }

  },
  async created() {
    const id = this.$route.params.volunteerId
    const volunteer = await volunteerService.getById(id)
    this.volunteer = JSON.parse(JSON.stringify(volunteer))
    this.miniVolunteer = { _id: volunteer._id, title: volunteer.title, imgUrl: volunteer.imgUrls[0] }
    // const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser))
    const user = await userService.getById('u101')
    const { _id, fullName, imgUrl } = user
    this.miniLoggedinUser = { _id, fullName, imgUrl }
    this.avgRates()
    // this.startDate = `${new Date(this.volunteer.startAt).getDate()}.${new Date(this.volunteer.startAt).getMonth() + 1}.${new Date(this.volunteer.startAt).getFullYear()}`
    // if (this.volunteer.endAt) {
    //   this.endDate = `${new Date(this.volunteer.endAt).getDate()}.${new Date(this.volunteer.endAt).getMonth() + 1}.${new Date(this.volunteer.endAt).getFullYear()}`
    // }
  },
  components: {
    avatar,
    rateStars,
    rateStarsEnable
  }
}
</script>

<style>
</style>