
<template>
  <section class="eventi-filter">
    <!-- free search -->
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
     <el-select
      v-if="filterBy.byKey.key && allFilds.keyList"
      class="select-input"
      v-model="filterBy.byKey.key"
      :value="allFilds.keyList[0]"
      @input="emitFilter"
      :items="allFilds.keyList"
      placeholder="filter by..."
    />
    <select-multi
      v-if="filterBy.byKey.key && options"
      class="select-input"
      v-model="filterBy.byKey.values"
      :value="['']"
      @input="emitFilter"
      :items="options"
      placeholder="Options"
    />


    <el-button  @click="changeFilter(emptyFilter)" class="see-all"
      >See All</el-button
    >
  </section>
</template>

<script>
import elSelect from "../cmp/element-ui/select";
import selectMulti from "../cmp/element-ui/select-multi";

export default {
  name: "eventi-filter",
  props: {
    initfilterBy: {
      type: Object,
    },
    tags: {
      type: Array,
      default: function () {
        return this.$store.getters.tags;
      },
    },
    neededs: {
      type: Array,
      default: function () {
        return this.$store.getters.neededs;
      },
    },
  },
  data() {
    return {
      emptyFilter: { byText: "", byKey: { key: "country", values: [] } },
      filterBy: null,
      debounce: null,
    };
  },
  computed: {
    allFilds() {
      const allFilds = this.$store.getters.allFilds;
      return allFilds;
    },
    options(){
      return this.allFilds.options[this.filterBy.byKey.key];
    }
  },
  created() {
    console.log("🚀 ~ file: eventi-filter.vue ~ line 76 ~ created ~ this.allFilds", this.allFilds)
    this.filterBy = (this.initfilterBy)? this.initfilterBy : JSON.parse(JSON.stringify(this.emptyFilter));
    console.log("🚀 ~ file: eventi-filter.vue ~ line 76 ~ created ~ this.filterBy", this.filterBy)
    if (this.$route.query.term || this.$route.query.tag) {
      this.filterBy.byText = this.$route.query.term;
      this.filterBy.byKey.key = "categoty";
      this.filterBy.byKey.values = this.$route.query.tag.split(",");
    }
    console.log("🚀 ~ file: eventi-filter.vue ~ line 76 ~ created ~ this.filterBy tags?", this.filterBy)
  },
  methods: {
    changeFilter(filterBy) {
      this.filterBy = JSON.parse(JSON.stringify(filterBy));
      this.emitFilter();
    },
    filterToExport() {
      if (!this.filterBy) return this.emptyFilter;
      const filter = JSON.parse(JSON.stringify(this.filterBy));
      
      if (filter.byKey.key === "organization")
        filter.byKey.key = "name";
      if (filter.byKey.key === "category") filter.byKey.key = "tags";

      filter.byKey.values.forEach((value, idx)=>{
        if (value.includes('including')) filter.byKey.values[idx] = "true";
      })
      filter.byKey.values.forEach((value, idx)=>{
        if (value.includes('excluding')) filter.byKey.values[idx] = "false";
      })

      console.log("🚀 ~ file: eventi-filter.vue ~ line 113 ~ filterToExport ~  filter.byKey.values",  filter.byKey.values)
      return filter;
    },
    emitFilter() {
      if (this.debounce) clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.$emit("doFilter", this.filterToExport());
        console.log("🚀 ~ file: eventi-filter.vue ~ line 119 ~ this.debounce=setTimeout ~ this.filterToExport()", this.filterToExport())
      }, 1000);
    },
  },
  components: {
    elSelect,
    selectMulti
  },
};
</script>

<style>
</style>