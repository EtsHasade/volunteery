<template>
<section>
  <h3>volu list</h3>
  <ul class="volunteer-list clean-list card-list">
    <volunteer-preview v-for="eventi in eventis" :key="eventi._id"  :eventi="eventi"/>
  </ul> 
</section>
</template>

<script>
import volunteerPreview from './volunteer-preview';

export default {
  name: 'volunteerList',
  props:{
    eventis: Array
  },
  components:{
    volunteerPreview
  }

}
</script>

<style>

</style>