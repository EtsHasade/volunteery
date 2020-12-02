
<template>
  <section class="eventi-filter flex column center mb10">
    <form class="flex center" @click.prevent="emitFilter">
      <el-input
        ref="searchFild"
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = 'Free Search'"
        placeholder="Free Search"
        v-model="filterBy.byText"
        @input="emitFilter"
      />
      <select-multi
        v-model="filterBy.byTags"
        @input="emitFilter"
        :items="tags"
        placeholder="Select Category"
      />
    </form>
    <section class="btns-tags flex center mb10">
      <el-button
        v-for="tag in showtags"
        :key="tag"
        @click="changeFilter({ byText: '', byTags: [tag] })"
        >{{ tag }}</el-button
      >
      <!-- <el-button @click="changeFilter({ byText: '', byTags: ['COVID-19'] })"
        >COVID-19</el-button>
      <el-button @click="changeFilter({ byText: '', byTags: ['Animals'] })"
        >Animals</el-button
      >
      <el-button @click="changeFilter({ byText: '', byTags: ['Needy'] })"
        >Needy</el-button
      > -->
      <el-button @click="changeFilter({ byText: '', byTags: [] })"
        >See All</el-button
      >
    </section>
  </section>
</template>

<script>
import selectMulti from "../cmp/element-ui/select-multi";
export default {
  name: "eventi-filter",
  props: {
    tags: {
      type: Array,
      default: function () {
        return this.$store.getters.tags;
      },
    },
    categorysNum: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      filterBy: { byText: "", byTags: [] },
      debounce: null,
    };
  },
  computed: {
    showtags() {
      return this.tags.filter((tag, idx) => idx < this.categorysNum);
    },
  },
  methods: {
    changeFilter(filterBy) {
      this.filterBy = JSON.parse(JSON.stringify(filterBy));
      this.emitFilter();
    },
    emitFilter() {
      if (this.debounce) clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.$emit("doFilter", JSON.parse(JSON.stringify(this.filterBy)));
      }, 1000);
    },
  },
  components: {
    selectMulti,
  },
};
</script>

<style>
</style>