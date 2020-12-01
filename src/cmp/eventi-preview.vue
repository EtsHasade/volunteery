
<template>
  <li class="eventi-preview card-preview flex-column" v-if="eventi"  @click="openDetails">
    <div class="img-squer-container">
      <img v-show="imgLoad" @load="imgLoad = true" :src="eventi.imgUrls[0]" alt="" />
      <div v-if="!imgLoad" class="loading flex center">LOADING...</div>
          <div
          @click.stop="openOrgDetails"
          class="div preview-card-avatar"
            :style="`background-image: url(${eventi.byOrg.imgUrl})`"
          ></div>
    </div>
    <div class="preview-details flex-column">
      <div class="card-label">
        <h3 class="card-title">{{ eventi.title }}</h3>
      </div>
      <h4 class="card-desc flex-g1">
        event descriptions, bla boman locomitor jcfif jkvivo  vkkvv njfiviv njiiv jiviv  jvvivi
      </h4>
      <div class="eventi-floor flex">
          <h4 class="country">{{ eventi.location.country }}</h4>
          <h4 class="time">{{moment(eventi.startAt).format('DD/MM/YYYY') }}</h4>
      </div>
    </div>
  </li>
</template>

<script>
// import avatar from "vue-avatar";
// import rateStars from "./element-ui/rate-stars";
var moment = require('moment')

export default {
  name: "eventiPreview",
  props: {
    eventi: Object,
  },
  data() {
    return {
      orgRate: 2,
      imgLoad: false,
      moment
    };
  },
  created() {
    // this.orgRate = JSON.parse(JSON.stringify(this.eventi.byOrg.rate));
  },
  components: {
    // rateStars,
    // avatar,
  },
  // watch: {
  //   orgRate: function (newRate) {
  //     console.log("orgRate:", newRate);
  //   },
  // },
  methods:{
    openDetails(){
      this.$router.push(`/eventi-details/${this.eventi._id}`)
    },
    openOrgDetails(){
      this.$router.push(`/org-details/${this.eventi.byOrg._id}`)
    }
  }
};
</script>

<style>
</style>