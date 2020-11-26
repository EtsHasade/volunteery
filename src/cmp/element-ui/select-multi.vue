<template>
  <el-select v-model="value" multiple placeholder="Select">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

  <!-- <el-select
    v-model="value"
    multiple
    collapse-tags
    style="margin-left: 20px"
    placeholder="Select"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select> -->
</template>

<script>
export default {
  props: {
      tags: Array
  },
  data() {
    return {
      options: [],
      value: []
    }
  },
  created() {
      console.log(this.tags);
      this.options = this.tags.map(tag=> {
      return {value: tag, label: tag}
      })
  },
  watch: {
    value: function (newValue) {
      this.$emit('input', newValue)
      console.log(newValue);
    }
  }
}
</script>