<template>
<section>
  <h3>volu list</h3>
  <ul class="volunteer-list clean-list card-list">
    <org-preview v-for="org in orgs" :key="org._id"  :org="org"/>
  </ul> 
</section>
</template>

<script>
import orgPreview from './org-preview';

export default {
  name: 'orgList',
  props:{
    orgs: Array
  },
  components:{
    orgPreview
  }

}
</script>

<style>

</style>