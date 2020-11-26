
<template>
  <li class="volunteer-preview flex-column">
    <img src="@/assets/img/650085_47717403.jpg" alt="" />
    <div class="org-details">
      <div class="flex">
        <avatar :username="eventi.byOrg.name" :src="eventi.byOrg.imgUrl"></avatar>
        <!-- <img class="org-logo" :src="eventi.byOrg.imgUrl" alt="" /> -->
        <h4>{{ eventi.byOrg.name }}</h4>
      </div>
      <rate-stars v-model="orgRate" ></rate-stars>
    </div>
    <div class="eventi-label">
      <h3>{{ eventi.title }}</h3>
      <div class="eventi-date flex">
        <h6>{{ new Date(eventi.startsAt).toLocaleDateString() }} |</h6>
        <h6>{{ eventi.location.country }}</h6>
      </div>
    </div>
    <div class="eventi-floor">
      <h4>{{ eventi.members.length }}/{{ eventi.capacity }} 👨‍👨‍👦</h4>
    </div>
  </li>
</template>

<script>
import avatar from "vue-avatar";
import rateStars from "./element-ui/rate-stars";

export default {
  name: "volunteerPreview",
  props: {
    eventi: Object,
  },
  data() {
    return {
      orgRate: 2,
    };
  },
  created() {
    this.orgRate = JSON.parse(JSON.stringify(this.eventi.byOrg.rate));
    console.log('init org rate', this.orgRate);
    
  },
  components: {
    rateStars,
    avatar,
  },
  watch:{
    orgRate: function(newRate){
      console.log('orgRate:' ,newRate);
      
    }
  }
};
</script>

<style>
</style>