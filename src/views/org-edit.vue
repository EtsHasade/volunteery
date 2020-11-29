<template>
  <section class="org-create flex column center text-center small-container">
    <h2>Add new orgaziation</h2>
    <form @submit.prevent="createOrg" class="flex column center">
      <el-input
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = 'orgaziation name'"
        placeholder="orgaziation name"
        v-model="orgCred.name"
        clearable
      ></el-input>
      <el-input
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = 'orgaziation country'"
        placeholder="country"
        v-model="orgCred.country"
        clearable
      ></el-input>
      <el-input
        type="textarea"
        :rows="3"
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = 'tell us about your organization'"
        placeholder="tell us about your organization"
        v-model="orgCred.desc"
      ></el-input>
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
      <el-button @click="createOrg">Add</el-button>
    </form>
  </section>
</template>

<script>
import { orgService } from '../service/org-service.js';
import selectMulti from '../cmp/element-ui/select-multi.vue';

export default {
  name: 'create-org',
  data() {
    return {
      orgCred: orgService.getEmptyOrg(),
      tags: this.$store.getters.tags,
    }
  },
  methods: {
    async createOrg() {
      console.log('create new org');
      const user = this.$store.getters.loggedinUser
      this.orgCred.admin = {
        _id: user._id,
        fullName: user.fullName,
        imgUrl: user.imgUrl
      }
      if (!this.orgCred.imgUrls.length) {
        this.orgCred.imgUrls.push('https://picsum.photos/id/237/200/300');
      }
      const res = await this.$store.dispatch({
        type: "saveOrg",
        org: this.orgCred,
      });
        if (res.type) {
          this.$message({
            showClose: true,
            message: `${this.orgCred.title} added sucessfully!`,
            type: 'success',
            duration: 1500
          })
        } else {
          this.$message({
            showClose: true,
            message: `${this.orgCred.title} cant added, err ${res.err.code}`,
            type: 'warning',
            duration: 1500
          })
      }
      this.orgCred = orgService.getEmptyOrg();
      this.$router.go(-1);
    }
  },
  components: {
    selectMulti
  }
}
</script>