<template>
  <el-select v-model="value" multiple onfocus="this.placeholder = ''" onblur="this.placeholder = 'Select'" placeholder="Select">
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
      items: Array
  },
  data() {
    return {
      options: [],
      value: []
    }
  },
  created() {
      this.options = this.items.map(item=> {
      return {value: item, label: item}
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