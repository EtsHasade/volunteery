<template>
<section>
  <h3>volu list</h3>
  <ul class="volunteer-list clean-list">
    <volunteer-preview></volunteer-preview>
  </ul>
</section>
</template>

<script>
import volunteerPreview from './volunteer-preview'

export default {
  name: 'volunteerList',
  components:{
    volunteerPreview
  }

}
</script>

<style>

</style>