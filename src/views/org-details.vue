<template>
  <section v-if="org" class="org-details">
    <section class="org-imgs">
      <img
        class="org-img"
        v-for="(img, idx) in org.imgUrls"
        :key="idx"
        :src="img"
      />
    </section>
    <main class="flex">
      <section class="details flex column">
        <h2>{{ org.name }}</h2>
        <h3>Goals:</h3>
        <h4>{{ org.goals }}</h4>
        <h3>Country: {{ org.country }}</h3>
        <section class="mini-user">
          <avatar :src="org.admin.imgUrl" />
          <span>Admin: {{ org.admin.fullName }}</span>
        </section>
        <rate-stars v-if="org.reviews.length" v-model="org.rate" />
        <span v-else>{{ msg }}</span>
        <span>Tags:</span>
        <section class="tags flex wrap">
          <span
            class="tag text-center mrg5"
            v-for="(tag, idx) in org.tags"
            :key="idx"
            >{{ tag }}</span
          >
        </section>
        <section class="org-eventis">
          <span>Our Events</span>
          <router-link
            v-if="isUserOrgAdmin"
            to="/eventi-edit"
            class="add-eventi el-button el-button--success"
            >Add Event</router-link
          >
          <eventi-list :eventis="orgEventis"></eventi-list>
        </section>
        <span>{{ org.desc }}</span>
        <span class="text-center mrg5">Reviews</span>
        <form
          @submit.prevent="addReview"
          class="add-review flex center text-center"
        >
          <el-input type="text" v-model="reviewToEdit.txt" name="review" />
          <el-button type="success">Add review</el-button>
          <rate-stars-enable v-model="reviewToEdit.rate" />
        </form>

        <section class="reviews flex column">
          <section
            class="review flex column mrg5"
            v-for="review in org.reviews"
            :key="review._id"
          >
            <section class="details-review flex">
              <avatar :src="review.author.imgUrl"></avatar>
              <rate-stars v-model="review.rate" class="review-rate" />
            </section>
            <section class="content-review flex center text-center">
              <span class="time mrg5">{{
                moment(review.createdAt).format("YYYY/MM/DD")
              }}</span>
              <span class="name-review mrg5">{{ review.author.fullName }}</span>
              <span class="txt-review">{{ review.txt }}</span>
            </section>
          </section>
        </section>
      </section>
      <section v-if="isUserOrgAdmin" class="status-details text-center">
        <el-button type="warning" @click="removeOrg"
          >Delete Organization</el-button
        >
        <router-link
          type="success"
          class="el-button el-button--success"
          :to="'/org-edit/' + org._id"
          >Edit</router-link
        >
      </section>
    </main>
  </section>
</template>

<script>
import { orgService } from "../service/org-service.js";
// import { userService } from "../service/user-service.js";
import avatar from "vue-avatar";
import rateStars from "../cmp/element-ui/rate-stars";
import rateStarsEnable from "../cmp/element-ui/rate-stars-enable";
import eventiList from "../cmp/eventi-list";

export default {
  name: "org-details",
  data() {
    return {
      org: null,
      reviewToEdit: { author: {}, txt: "", rate: 5 },
      miniLoggedinUser: null,
      textBtn: "Join us!",
      msg: "no Rates",
      //   avgRate: null
      //   startDate: null,
      //   endDate: null
    };
  },
  computed: {
    orgEventis() {
      const eventis = this.$store.getters.eventisForDisplay.filter((eventi) => {
        if (eventi.byOrg) {
          return eventi.byOrg._id === this.org._id;
        }
      });
      return eventis;
    },
      isUserOrgAdmin(){
      const loggedinUser = this.$store.getters.loggedinUser;
      console.log("🚀 ~ file: eventi-details.vue ~ line 139 ~ isUserOrgAdmin ~ loggedinUser", loggedinUser)
      if (!loggedinUser || !loggedinUser.org || loggedinUser.org._id !== this.org._id) return false;
      else return true;
    }
  },
  methods: {
    avgRates() {
      if (this.org.reviews.length === 1) {
        this.org.rate = this.org.reviews[0].rate;
      }
      var sum = 0;
      this.org.reviews.forEach((review) => {
        sum += review.rate;
      });
      this.org.rate = sum / this.org.reviews.length;
    },
    addReview() {
      this.reviewToEdit.rate = Number(this.reviewToEdit.rate);
      this.reviewToEdit.createdAt = Date.now();
      this.reviewToEdit._id = orgService.makeId();
      this.reviewToEdit.author = JSON.parse(
        JSON.stringify(this.miniLoggedinUser)
      );
      this.org.reviews.push(this.reviewToEdit);
      orgService.save(JSON.parse(JSON.stringify(this.org)));
      this.reviewToEdit = { author: {}, txt: "", rate: 5 };
      this.avgRates();
    },
    removeOrg() {
      this.$store.dispatch({ type: "removeOrgById", orgId: this.org._id });
      this.$router.go(-1);
    },
    // getAvgRate() {
    //     this.avgRate = [...this.org.reviews].reduce((a, b) => (a.rate + b.rate)) / this.org.reviews.length
    //     console.log(this.avgRate);
    // }
  },
  async created() {
    this.$store.dispatch({ type: "setEventis" });
    const id = this.$route.params.orgId;
    const org = await orgService.getById(id);
    this.org = JSON.parse(JSON.stringify(org)) || {};

    // const user = await userService.getById("u101");
    const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser))
    const { _id, fullName, imgUrl } = user;
    this.miniLoggedinUser = { _id, fullName, imgUrl };
    this.avgRates();
  },
  components: {
    avatar,
    rateStars,
    rateStarsEnable,
    eventiList,
  },
};
</script>

<style>
</style>