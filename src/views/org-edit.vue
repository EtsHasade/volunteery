<template>
    <section class="org-create flex column center text-center small-container">
        <h2>Add new orgaziation</h2>
        <form @submit.prevent="createOrg">
            <el-input placeholder="orgaziation name" v-model="orgCred.name" clearable></el-input>
            <el-input placeholder="country" v-model="orgCred.country" clearable></el-input>
            <el-input type="textarea" :rows="4" placeholder="orgaziation description" v-model="orgCred.desc"></el-input>
            <select-multi v-model="orgCred.tags" :items="tags"></select-multi>
            <br><el-button @click="createOrg">Add</el-button><br>
        </form>
    </section>
</template>

<script>
import { orgService } from '../service/org-service.js';
import selectMulti from '../cmp/element-ui/select-multi.vue';

export default {
    name: 'create-org',
    data(){
        return{ 
            orgCred: orgService.getEmptyOrg(),
            tags: this.$store.getters.tags,
        }
    },
    methods: {
        createOrg(){
            console.log('create new org');
            if(!this.orgCred.imgUrls) this.orgCred.imgUrls.push('https://picsum.photos/id/237/200/300');
            orgService.save(this.orgCred);
            this.orgCred = orgService.getEmptyEventi();
            this.$router.push('/')
        }
    },
    components: {
    selectMulti
  }
}
</script>