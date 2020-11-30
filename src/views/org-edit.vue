<template>
  <section class="edit-page">
    <div
      v-if="!loggedinUser || !loggedinUser.org"
      class="edit-page-title title flex-column center-all"
    >
      <h2>Need volunteers? join us!</h2>
      <h3>It's free, quick And simple</h3>
    </div>
    <div class="side-tabs flex">
      <h2 class="title-tab active">Add your orgaziation</h2>
      <h2 class="title-tab">Publish new event and invite volunteers</h2>
    </div>
    <keep-alive>
    <form @submit.prevent="createOrg" class="edit-form flex column center">
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
        onblur="this.placeholder = 'tell us about your goals'"
        type="textarea"
        :rows="2"
        placeholder="tell us about your goals"
        onfocus="this.placeholder = ''"
        v-model="orgCred.goals"
      >
      </el-input>
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
      <el-button @click="createOrg">{{
        (!loggedinUser || !loggedinUser.org) ? "Next >" : "Save"
      }}</el-button>
    </form>
    </keep-alive>
  </section>
</template>

<script>
import { orgService } from "../service/org-service.js";
import selectMulti from "../cmp/element-ui/select-multi";

export default {
  name: "orgEdit",
  data() {
    return {
      orgCred: orgService.getEmptyOrg(),
      tags: this.$store.getters.tags,
      loggedinUser: this.$store.getters.loggedinUser,
    };
  },
  methods: {
    async createOrg() {
      if(!this.loggedinUser) this.$router.push('/login');
      console.log("create new org");
      const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser));
      this.orgCred.admin = {
        _id: user._id,
        fullName: user.fullName,
        imgUrl: user.imgUrl,
      };
      if (!this.orgCred.imgUrls.length) {
        this.orgCred.imgUrls.push("https://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg");
      }
      const res = await this.$store.dispatch({
        type: "saveOrg",
        org: this.orgCred,
      });

      user.org = {
        _id: res.org._id,
        name: res.org.name,
        imgUrl: res.org.imgUrls[0],
      };
        await this.$store.dispatch({ type: "updateUser", user });

      if (res.type) {
        this.$message({
          showClose: true,
          message: `${this.orgCred.title} added sucessfully!`,
          type: "success",
          duration: 1500,
        });
      } else {
        this.$message({
          showClose: true,
          message: `${this.orgCred.title} cant added, err ${res.err}`,
          type: "warning",
          duration: 1500,
        });
      }
      this.orgCred = orgService.getEmptyOrg();
      this.$router.push("/eventi-edit/");
    },
  },
  components: {
    selectMulti,

  },
};
</script>