<template>
  <div class="rate-stars">
    <el-rate
      v-model="value"  
      show-score
      text-color="#ff9900"
      score-template="{value} stars"
    >
    </el-rate>
  </div>
</template>

<script>

export default {
  props:{
    value: Number,
  },
  watch:{
    value: function(newValue){
      this.$emit('input', newValue)     
    }
  }
};
</script>