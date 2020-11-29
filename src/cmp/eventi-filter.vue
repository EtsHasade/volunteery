
<template>
  <section class="eventi-filter flex center mb10">
    <form class="flex center" @click.prevent="emitFilter">
      <el-input
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = 'Search By Title'"
        placeholder="Search By Title"
        v-model="filterBy.byTitle"
        @input="emitFilter"
      />
      <select-multi
        v-model="filterBy.byTags"
        @input="emitFilter"
        :items="tags"
      />
    </form>
  </section>
</template>

<script>
import selectMulti from '../cmp/element-ui/select-multi'
export default {
  name: 'eventi-filter',
  data() {
    return {
      filterBy: { byTitle: '', byTags: [] },
      debounce: null,
      tags: this.$store.getters.tags
    }
  },
  methods: {
    emitFilter() {
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