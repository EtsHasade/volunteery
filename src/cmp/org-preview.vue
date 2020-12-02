
<template>
  <li
    v-if="org"
    class="eventi-preview card-preview flex-column"
    @click="openDetails"
  >
    <div class="img-squer-container">
      <img
        v-show="imgLoad"
        @load="imgLoad = true"
        :src="org.imgUrls[0]"
        alt=""
      />
      <div v-if="!imgLoad" class="loading flex center">LOADING...</div>
    </div>
    <div class="preview-details flex-column">
      <div class="card-label">
        <h3 class="card-title mb10">{{ org.name }}</h3>
        <h6 class="org-mini-details country">{{ org.country }}</h6>
      </div>
      <p class="org-goals card-desc flex-g1">{{ org.goals }}</p>
      <div class="card-footer flex align-center space-between">
        <h5 v-if="org.reviews.length">
          <i class="star fas fa-star"></i>
          {{ org.rate }} ({{ org.reviews.length }} reviews)
        </h5>
        <h5 v-else><i class="star fas fa-star"></i>New</h5> 
        <h5 class="org-eventis">{{ orgEventis.length }} Events</h5>
      </div>
    </div>
  </li>
</template>

<script>
// import rateStars from "./element-ui/rate-stars";

export default {
  name: "orgPreview",
  props: {
    org: Object,
  },
  data() {
    return {
      rate: 2,
      imgLoad: false,
    };
  },
  computed: {
    orgEventis() {
      const eventis = this.$store.getters.eventisForDisplay.filter((eventi) => {
        if (eventi.byOrg) {
          return eventi.byOrg._id === this.org._id;
        }
      });
      // console.log(
      //   "🚀 ~ file: org-preview.vue ~ line 37 ~ orgEventis ~ eventis",
      //   eventis
      // );
      return eventis;
    },
  },
  created() {
    // this.orgRate = JSON.parse(JSON.stringify(this.org.rate));
    // console.log("org", this.org);
  },
  components: {
    // rateStars,
  },
  // watch: {
  //   rate: function (newRate) {
  //     console.log("rate:", newRate);
  //   },
  // },
  methods: {
    openDetails() {
      this.$router.push(`/org-details/${this.org._id}`);
    },
  },
};
</script>

<style>
</style>