
<template>
  <li v-if="org" class="eventi-preview card-preview flex-column" @click="openDetails">
    <div class="img-squer-container">
      <img v-show="imgLoad" @load="imgLoad = true" :src="org.imgUrls[0]" alt="" />
      <div v-if="!imgLoad" class="loading flex center">LOADING...</div>
    </div>
    <div class="preview-details">
      <div class="org-details">
        <h4 class="org-name">{{ org.name }}</h4>
        <div class="flex">
          <h6 class="org-mini-details">{{ org.admin.fullName }}</h6>
          <h6 class="org-mini-details">{{ org.country }}</h6>
        </div>
        <h6 class="org-goals">{{ org.goals }}</h6>
        <rate-stars v-model="rate"></rate-stars>
        <h6 class="org-eventis">{{ orgEventis.length }} Eventiy events</h6>
      </div>
    </div>
  </li>
</template>

<script>
import rateStars from "./element-ui/rate-stars";

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
      const eventis = this.$store.getters.eventisForDisplay.filter(
        (eventi) => {
          if (eventi.byOrg) {
            return eventi.byOrg._id === this.org._id;
          }
        }
      );
      // console.log(
      //   "🚀 ~ file: org-preview.vue ~ line 37 ~ orgEventis ~ eventis",
      //   eventis
      // );
      return eventis;
    }
  },
  created() {
    this.orgRate = JSON.parse(JSON.stringify(this.org.rate));
    // console.log("org", this.org);
  },
  components: {
    rateStars,
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