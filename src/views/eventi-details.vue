<template>
  <section v-if="eventi" class="eventi-details">
    <section class="eventi-imgs">
      <img
        class="eventi-img"
        v-for="(img, idx) in eventi.imgUrls"
        :key="idx"
        :src="img"
      />
    </section>
    <main class="flex justify-center">
      <section class="details flex column">
        <h2>{{ eventi.title }}</h2>
        <section class="mini-org">
          <avatar :src="eventi.byOrg.imgUrl" />
          <!-- <img class="img-org mini-img" :src="eventi.byOrg.imgUrl" alt="" /> -->
          <span>By {{ eventi.byOrg.name }}</span>
        </section>
        <span
          >{{ eventi.location.address }}, {{ eventi.location.country }}</span
        >
        <rate-stars v-if="eventi.reviews.length" v-model="eventi.rate" />
        <!-- <span v-if="eventi.reviews.length">{{ eventi.rate }} Stars</span> -->
        <span v-else>{{ msg }}</span>
        <span>Tags:</span>
        <section class="tags flex wrap">
          <span
            class="tag text-center mrg5"
            v-for="(tag, idx) in eventi.tags"
            :key="idx"
            >{{ tag }}</span
          >
        </section>
        <span>Limit: {{ eventi.capacity }} members</span>
        <section class="dates flex column">
          <span
            >date start:
            {{ moment(eventi.startAt).format("YYYY/MM/DD HH:MM") }}</span
          >
          <span v-if="eventi.endAt"
            >date end:
            {{ moment(eventi.endAt).format("YYYY/MM/DD HH:MM") }}</span
          >
        </section>
        <section class="neededs">
          <span>We need for this eventi:</span>
          <ul class="needed-content clean-list flex wrap">
            <li
              class="needed text-center mrg5"
              v-for="(needed, idx) in eventi.neededs"
              :key="idx"
            >
              {{ needed }}
            </li>
          </ul>
        </section>
        <span>{{ eventi.desc }}</span>
        <span class="text-center mrg5">Reviews</span>
        <section class="add-review flex align-center text-center mb10">
          <el-input type="text" v-model="reviewToEdit.txt" name="review" />
          <el-button type="success" @click="addReview">Add review</el-button>
          <rate-stars-enable class="mb10" v-model="reviewToEdit.rate" />
        </section>

        <section class="reviews flex column">
          <section
            class="review flex column mrg5"
            v-for="review in eventi.reviews"
            :key="review._id"
          >
            <section class="details-review flex">
              <avatar :src="review.author.imgUrl"></avatar>
              <rate-stars v-model="review.rate" class="review-rate" />
              <span class="time mrg5">
                {{ moment(review.createdAt).startOf("minute").fromNow() }}
              </span>
            </section>
            <section class="content-review flex align-center text-center">
              <span class="name-review mrg5"
                >{{ review.author.fullName }}:
              </span>
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
              v-for="member in eventi.members"
              :key="member._id"
              :src="member.imgUrl"
              :title="member.fullName"
            />
          </section>
        </section>

        <div v-if="isUserOrgAdmin" class="edit-btns">
          <el-button type="danger" @click="removeEventi"
            >Delete Event</el-button
          >
          <router-link
            type="success"
            class="el-button el-button--success"
            :to="'/eventi-edit/' + eventi._id"
            >Edit</router-link
          >
        </div>
      </section>
    </main>
  </section>
</template>

<script>
import { eventiService } from '../service/eventi-service.js';
import { userService } from '../service/user-service.js';
import avatar from "vue-avatar";
import rateStars from '../cmp/element-ui/rate-stars';
import rateStarsEnable from '../cmp/element-ui/rate-stars-enable';
var moment = require('moment')
export default {
  name: 'eventi-details',
  data() {
    return {
      moment,
      eventi: null,
      reviewToEdit: { author: {}, txt: '', rate: 5 },
      miniLoggedinUser: null,
      miniEventi: null,
      textBtn: 'Join us!',
      msg: 'no Rates',
      //   avgRate: null
      //   startDate: null,
      //   endDate: null
    }
  },
  computed: {
    isUserOrgAdmin() {
      const loggedinUser = this.$store.getters.loggedinUser;
      console.log("🚀 ~ file: eventi-details.vue ~ line 139 ~ isUserOrgAdmin ~ loggedinUser", loggedinUser)
      if (!loggedinUser || !loggedinUser.org || loggedinUser.org._id !== this.eventi.byOrg._id) return false;
      else return true;
    }
  },
  methods: {
    avgRates() {
      if (this.eventi.reviews.length === 1) {
        this.eventi.rate = this.eventi.reviews[0].rate
      }
      var sum = 0
      this.eventi.reviews.forEach(review => {
        sum += review.rate
      })
      this.eventi.rate = sum / this.eventi.reviews.length
      // return sum / this.eventi.reviews.length
    },
    async addMember() {
<<<<<<< HEAD
      if (!this.miniLoggedinUser._id) {
       console.log('Login first');
       return
      }
      if (this.eventi.members.find(member => member._id === this.miniLoggedinUser._id)) return
=======
      if (this.eventi.members.find(member => member._id === this.miniLoggedinUser._id)) {
        this.$message({
          showClose: true,
          message: `You already joined!`,
          type: 'success',
          duration: 1500
        })
        return
      }
>>>>>>> 95176c1e7878a255e1f310e26c63b7dd015704ef
      const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser))
      // const user = await userService.getById('u101')
      this.eventi.members.push(this.miniLoggedinUser)
      eventiService.save(JSON.parse(JSON.stringify(this.eventi)))
      user.events.push(JSON.parse(JSON.stringify(this.miniEventi)))
      userService.update(user)
      this.$message({
        showClose: true,
        message: `You are a member!`,
        type: 'success',
        duration: 1500
      })
      this.textBtn = 'Your already join'
    },
    addReview() {
      this.reviewToEdit.rate = Number(this.reviewToEdit.rate)
      this.reviewToEdit.createdAt = Date.now()
      this.reviewToEdit._id = eventiService.makeId()
      this.reviewToEdit.author = JSON.parse(JSON.stringify(this.miniLoggedinUser)) || { fullName: 'Goust' }
      this.eventi.reviews.push(this.reviewToEdit)
      eventiService.save(JSON.parse(JSON.stringify(this.eventi)))
      this.$message({
        showClose: true,
        message: `Your review added sucessfully!`,
        type: 'success',
        duration: 1500
      })

      this.reviewToEdit = { author: {}, txt: '', rate: 5 }
      this.avgRates()
    },
    async removeEventi() {
      const res = await this.$store.dispatch({ type: 'removeEventiById', eventiId: this.eventi._id });
      if (res.type) {
        this.$message({
          showClose: true,
          message: `${this.eventi.title} removed sucessfully!`,
          type: 'success',
          duration: 1500
        })
      } else {
        this.$message({
          showClose: true,
          message: `${this.eventi.title} cant remove, err ${res.err.code}`,
          type: 'warning',
          duration: 1500
        })
      }
      this.$router.go(-1);
    }
    // getAvgRate() {
    //     this.avgRate = [...this.eventi.reviews].reduce((a, b) => (a.rate + b.rate)) / this.eventi.reviews.length
    //     console.log(this.avgRate);
    // }

  },
  async created() {
    const id = this.$route.params.eventiId
    const eventi = await eventiService.getById(id)
    this.eventi = JSON.parse(JSON.stringify(eventi))
    this.miniEventi = { _id: eventi._id, title: eventi.title, imgUrl: eventi.imgUrls[0] }

    // const user = await userService.getById('u101')
    const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser)) || { fullName: 'Goust' }
    const { _id, fullName, imgUrl } = user
    this.miniLoggedinUser = { _id, fullName, imgUrl }
    this.avgRates()
    if (this.eventi.members.find(member => member._id === this.miniLoggedinUser._id)) {
      this.textBtn = 'You already joined'
    }
    // this.startDate = `${new Date(this.eventi.startAt).getDate()}.${new Date(this.eventi.startAt).getMonth() + 1}.${new Date(this.eventi.startAt).getFullYear()}`
    // if (this.eventi.endAt) {
    //   this.endDate = `${new Date(this.eventi.endAt).getDate()}.${new Date(this.eventi.endAt).getMonth() + 1}.${new Date(this.eventi.endAt).getFullYear()}`
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