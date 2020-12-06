
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
    <section v-if="org" class="details-org-section flex align-center">
      <avatar
        style="background-position: center; background-size: cover"
        class="org-logo hover-pointer mr10"
        :username="org.name"
        :src="org.logo"
        :title="org.name"
      />
      <h3 class="mrg0 card-title">{{ org.name }}</h3>
    </section>
    <section class="mini-details-top flex space-between">
      <h5 v-if="org.reviews.length">
        <i class="star fas fa-star"></i>
        {{ org.rate }} ({{ org.reviews.length }} reviews)
      </h5>
      <h5 v-else><i class="star fas fa-star"></i>New</h5>
      <h5 class="org-eventis">{{ orgEventis.length }} Events</h5>
    </section>
    <h5 class="org-mini-details country">{{ org.country }}</h5>
    <div class="preview-details flex column flex-g1">
      <p class="org-goals card-desc flex-g1">{{ org.goals }}</p>
      <div class="eventi-floor card-footer flex space-around">
        <section
          class="tag flex column center"
          v-for="(tag, idx) in org.tags"
          :key="idx"
        >
          <i :class="tagsIcon[tag]"></i>
          <p>{{ tag }}</p>
        </section>
      </div>
    </div>
  </li>
</template>

<script>
// import rateStars from "./element-ui/rate-stars";
import avatar from "vue-avatar";

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
      return eventis;
    },
    tagsIcon() {
      return this.$store.getters.tagsIcon;
    },
  },
  created() {
    // this.orgRate = JSON.parse(JSON.stringify(this.org.rate));
    // console.log("org", this.org);
  },
  components: {
    avatar
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