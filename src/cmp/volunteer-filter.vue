
<template>
  <section class="volunteer-filter flex center mb10">
    <form class="flex center" @click.prevent="emitFilter">
      <el-input
        placeholder="Search By Title"
        v-model="filterBy.byTitle"
        @input="emitFilter"
      />
      <select-multi v-model="filterBy.byTags" @input="emitFilter" :items="tags" />
    </form>
  </section>
</template>

<script>
import selectMulti from '../cmp/element-ui/select-multi'
export default {
  name: 'volunteer-filter',
  data() {
    return {
      filterBy: { byTitle: '', byTags: [] },
      debounce: null,
      tags: this.$store.getters.tags
    }
  },
  methods: {
    emitFilter() {
      console.log('emit');
      if (this.debounce) clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.$emit("doFilter", JSON.parse(JSON.stringify(this.filterBy)));
      }, 1000)
    }
  },
  components: {
    selectMulti
  }
}

</script>

<style>
</style>