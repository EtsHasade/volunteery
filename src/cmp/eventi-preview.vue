
<template>
  <li class="eventi-preview card-preview flex-column" v-if="eventi"  @click="openDetails">
    <div class="img-squer-container">
      <img v-show="imgLoad" @load="imgLoad = true" :src="eventi.imgUrls[0]" alt="" />
      <div v-if="!imgLoad" class="loading flex center">LOADING...</div>
    </div>
    <!-- <div class="preview-details" :style="`background-image: url('${eventi.imgUrls[0]}'); transform: scaleY(-1);`"> -->
    <div class="preview-details">
      <div class="org-details">
        <div class="flex mb10">
          <avatar
            @click.stop="openOrgDetails"
            style="
               {
                background-position: center;
                background-size: cover;
              }
            "
            :username="eventi.byOrg.name"
            :src="eventi.byOrg.imgUrl"
          ></avatar>
          <!-- <img class="org-logo" :src="eventi.byOrg.imgUrl" alt="" /> -->
          <h4>{{ eventi.byOrg.name }}</h4>
        </div>
        <!-- <rate-stars v-model="orgRate" :disabled="true"></rate-stars> -->
        <p><i class="star fas fa-star"></i> {{eventi.byOrg.rate}}</p>
      </div>
      <div class="eventi-label">
        <h3>{{ eventi.title }}</h3>
        <div class="eventi-date flex">
          <h4><b>{{ eventi.location.country }} </b>| </h4>
          <h4> {{moment(eventi.startAt).format('DD/MM/YYYY') }}</h4>
        </div>
      </div>
      <div class="eventi-floor">
        <h4>{{ eventi.members.length }}/{{ eventi.capacity }}</h4>
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
    avatar,
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