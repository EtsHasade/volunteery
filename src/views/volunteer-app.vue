<template>
<main>
    <volunteer-filter></volunteer-filter>
    <volunteer-list></volunteer-list>
    <h2>DEV</h2>
</main>
  
</template>

<script>
import volunteerFilter from '@/cmp/volunteer-filter';
import volunteerList from '@/cmp/volunteer-list';


export default {
    name: 'voluteerApp',
    components:{
        volunteerFilter,
        volunteerList,
    }
}
</script>

<style>

</style>