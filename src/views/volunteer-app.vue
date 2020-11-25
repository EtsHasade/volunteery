<template>
<main>
    <volunteer-filter></volunteer-filter>
    <volunteer-list></volunteer-list>
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