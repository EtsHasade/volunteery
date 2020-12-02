

<template>
  <li class="eventi-preview card-preview flex-column" v-if="eventi" @click="openDetails">
    <div class="img-squer-container">
      <img v-show="imgLoad" @load="imgLoad = true" :src="eventi.imgUrls[0]" alt="" />
      <div v-if="!imgLoad" class="loading flex center">LOADING...</div>
      <p class="country preview-card-country">{{eventi.location.country}}</p>
    </div>
    <section v-if="org" class="details-org-section flex align-center">
        <avatar
          style="background-position: center; background-size: cover"
          class="org-logo hover-pointer mr10"
          :username="org.name"
          :src="org.logo"
          :title="org.name"
          @click.stop="openOrgDetails"
        />
        <h3 class="mrg0 card-title">{{eventi.title}}</h3>
      </section>

        <!-- <section class="details-org flex column"> -->
        <!-- </section> -->
        <section class="mini-details flex space-between">
            <h5 v-if="eventi.reviews.length">
              <i class="star fas fa-star"></i>
              {{ eventi.rate }} ({{ eventi.reviews.length }} reviews)
            </h5>
            <h5 v-else><i class="star fas fa-star"></i>New</h5> 
            <!-- <h5 class="time">{{ moment(eventi.startAt).format("DD/MM/YYYY") }}</h5> -->
        </section>
    <div class="preview-details flex-column">
      <!-- <div class="card-label">
        <h3 class="card-title">{{ eventi.title }}</h3>
      </div> -->
      <p class="card-desc flex-g1">
        {{ eventi.previewDesc || eventi.desc }}
      </p>
      <div class="eventi-floor card-footer flex space-around">
        <section class="tag flex column center" v-for="(tag, idx) in eventi.tags" :key="idx">
          <i :class="tagsIcon[tag]"></i>
          <p>{{ tag }}</p>
        </section>
      </div>
    </div>
  </li>
</template>

<script>
import avatar from "vue-avatar";
// import rateStars from "./element-ui/rate-stars";
var moment = require('moment')

export default {
  name: "eventiPreview",
  props: {
    eventi: Object,
  },
  data() {
    return {
      org: null,
      orgRate: 2,
      imgLoad: false,
      moment
    };
  },
  created() {
    this.getOrg()
    // this.orgRate = JSON.parse(JSON.stringify(this.eventi.byOrg.rate));
  },
  components: {
    // rateStars,
    avatar,
  },
  // watch: {
  //   orgRate: function (newRate) {
  //     console.log("orgRate:", newRate);
  //   },
  // },
  computed: {
    
    tagsIcon() {
      return this.$store.getters.tagsIcon;
    },
  },
  methods: {
    async getOrg() {
      const orgId = this.eventi.byOrg._id
      this.org = await this.$store.dispatch({ type: "getOrgById", orgId });
    },
    openDetails() {
      this.$router.push(`/eventi-details/${this.eventi._id}`)
    },
    openOrgDetails() {
      this.$router.push(`/org-details/${this.eventi.byOrg._id}`)
    }
  }
};
</script>

<style>
</style>