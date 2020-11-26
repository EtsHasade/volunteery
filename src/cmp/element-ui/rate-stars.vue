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
  data() {
    return {
      value: 0
    };
  },
  watch:{
    value: function(newValue){
      this.$emit('input', newValue)     
    }
  }
};
</script>