<template>
  <div class="rate-stars">
    <el-rate
      v-model="value"
      
      show-score
      text-color="#ff9900"
      score-template="{value} points"
    >
    </el-rate>
  </div>
</template>

<script>
// disabled

export default {
  props: {
    initRate: Number,
  },
  data() {
    return {
      value: 0
    };
  },
  created() {
    this.rate = this.initRate;
  },
  watch:{
    value: function(newValue){
      this.$emit('input', newValue)
      console.log('newValue',newValue);
      
    }
  }
};
</script>