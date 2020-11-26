<template>
  <div class="rate-stars">
    <div class="block">
      <el-rate
        v-model="value"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value} points"
      >
      </el-rate>
    </div>
  </div>
</template>

<script>
export default {};
</script>


<script>
export default {
  data() {
    return {
      value: 3.8,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"], // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    };
  },
};
</script>