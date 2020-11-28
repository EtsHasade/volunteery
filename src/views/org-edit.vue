<template>
    <section class="org-create flex column center text-center small-container">
        <h2>Add new orgaziation</h2>
        <form @submit.prevent="createOrg" class="flex column center">
            <el-input onfocus="this.placeholder = ''" onblur="this.placeholder = 'orgaziation name'" placeholder="orgaziation name" v-model="orgCred.name" clearable></el-input>
            <el-input onfocus="this.placeholder = ''" onblur="this.placeholder = 'orgaziation country'" placeholder="country" v-model="orgCred.country" clearable></el-input>
            <el-input type="textarea" :rows="3" onfocus="this.placeholder = ''" onblur="this.placeholder = 'tell us about your organization'" placeholder="tell us about your organization" v-model="orgCred.desc"></el-input>
            <span>Select tags</span>
            <select-multi v-model="orgCred.tags" :items="tags"></select-multi>
            <el-input
                onblur="this.placeholder = 'tell us about your goals'"
                type="textarea"
                :rows="2"
                placeholder="tell us about your goals"
                onfocus="this.placeholder = ''"
                v-model="orgCred.goals"
            >
            </el-input>
            <el-button>Add</el-button>
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
            this.$router.go(-1);
        }
    },
    components: {
    selectMulti
  }
}
</script>