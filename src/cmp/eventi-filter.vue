
<template>
  <section class="eventi-filter flex column center mb10">
    <form class="flex center" @click.prevent="emitFilter">
      <el-input
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = 'Free Search'"
        placeholder="Free Search"
        v-model="filterBy.byTitle"
        @input="emitFilter"
      />
      <select-multi
        v-model="filterBy.byTags"
        @input="emitFilter"
        :items="tags"
      />
    </form>
    <section class="btns-tags flex center mb10">
      <el-button @click="changeFilter({ byTitle: '', byTags: ['COVID-19'] })"
        >COVID-19</el-button
      >
      <el-button @click="changeFilter({ byTitle: '', byTags: ['Animals'] })"
        >Animals</el-button
      >
      <el-button @click="changeFilter({ byTitle: '', byTags: ['Needy'] })"
        >Needy</el-button
      >
      <el-button @click="changeFilter({ byTitle: '', byTags: [] })"
        >Clear</el-button
      >
    </section>
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
    changeFilter(filterBy) {
      this.filterBy = JSON.parse(JSON.stringify(filterBy))
      this.emitFilter()
    },
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