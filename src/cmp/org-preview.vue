
<template>
  <li class="volunteer-preview card-preview flex-column">
    <div class="img-squer-container">
    <img :src="org.imgUrl" alt="" />
    </div>
    <div class="preview-details">

    <div class="org-details">
        <h4 class="org-name">{{org.name}}</h4>
      <div class="flex">
        <h6 class="org-mini-details">{{org.admin.fullName}}</h6>
        <h6 class="org-mini-details">{{ org.country }}</h6>
      </div>
      <h6 class="org-goals">{{org.goals}}</h6>
      <rate-stars v-model="rate" ></rate-stars>
      <h6 class="org-volunteers">{{orgNumEventis}} Volunteery events</h6>
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
      rate: 2

    };
  },
  computed:{
  orgNumEventis(){
    const orgEventis = this.$store.getters.volunteersForDisplay.filter(eventi=>{
      return eventi.byOrg._id === this.org._id;

    });
    console.log("🚀 ~ file: org-preview.vue ~ line 37 ~ orgNumEventis ~ orgEentis", orgEventis)
    return orgEventis.length
    
  }
  },
  created() {
    this.orgRate = JSON.parse(JSON.stringify(this.org.rate));

  },
  components: {
    rateStars,
  },
  watch:{
    rate: function(newRate){
      console.log('rate:' ,newRate);
      
    }
  }
};
</script>

<style>
</style>