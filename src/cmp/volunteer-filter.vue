
<template>
  <section class="volunteer-filter">
    <h3>volu filter</h3>
    <form @click.prevent="emitFilter">
      <input
        type="text"
        placeholder="Search By Title"
        v-model="filterBy.byTitle"
        @input="emitFilter"
      />
      <select-multi v-model="filterBy.byTags" :items="tags" />
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