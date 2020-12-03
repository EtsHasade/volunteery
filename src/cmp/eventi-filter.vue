
<template>
  <section class="eventi-filter">
    <form class="search-container flex wrap" @click.prevent="emitFilter">
      <el-input
        ref="searchFild"
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = 'Free Search'"
        placeholder="Free Search"
        suffix-icon="el-icon-search"
        v-model="filterBy.byText"
        @input="emitFilter"
      />
    </form>
      <el-button
        v-for="tag in showtags"
        :key="tag"
        @click="changeFilter({ byText: '', byTags: [tag] })"
        :class="{ active: filterBy.byTags.includes(tag) }"
        ><i class="small-icon" :class="$store.getters.tagsIcon[tag]"></i>{{ tag }}</el-button
      >
      <select-multi
        class="select-input"
        v-model="filterBy.byTags"
        @input="emitFilter"
        :items="tags"
        placeholder="More categories..."
      />

      <el-button
        @click="changeFilter({ byText: '', byTags: [] })"
        class="see-all"
        >See All</el-button
      >
  </section>
</template>

<script>
import selectMulti from "../cmp/element-ui/select-multi";
export default {
  name: "eventi-filter",
  props: {
    initfilterBy: {
      type: Object,
      default: function () {
        return { 'byText': "", 'byTags': [] };
      },
    },
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
  created() {
    this.filterBy = this.initfilterBy || { 'byText': "", 'byTags': [] };
      if (this.$route.query.term || this.$route.query.tag) {
      this.filterBy.byText = this.$route.query.term;
      this.filterBy.byTags = this.$route.query.tag.split(',');
    }
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