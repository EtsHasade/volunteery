<template>
<section>
  <ul v-if="orgs" class="org-list clean-list card-list">
    <org-preview v-for="org in orgs" :key="org._id"  :org="org"/>
  </ul> 
  <div v-else>LOADING...</div>
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