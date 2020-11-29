<template>
  <section class="edit-page">
    <div class="edit-page-title title flex-column center-all">
      <h2>Create new event</h2>
      <h3>It's free, quick And simple</h3>
    </div>

    <div class="side-tabs flex">
      <h2 class="title-tab">Edit your orgaziation</h2>
      <h2 class="title-tab active">Publish new event and invite volunteers</h2>
    </div>
    <form class="edit-form flex column center" @submit.prevent="saveEventi">
      <el-input
        onblur="this.placeholder = 'Eventi title'"
        onfocus="this.placeholder = ''"
        placeholder="Eventi title"
        v-model="eventiToEdit.title"
        clearable
      >
      </el-input>
      <el-input
        onblur="this.placeholder = 'tell us about your eventi'"
        type="textarea"
        :rows="3"
        placeholder="tell us about your eventi"
        onfocus="this.placeholder = ''"
        v-model="eventiToEdit.desc"
      >
      </el-input>
      <section class="dates">
        <div class="block">
          <el-date-picker
            lang="eng"
            v-model="dates"
            type="datetimerange"
            start-placeholder="Start date"
            end-placeholder="End date"
          >
          </el-date-picker>
        </div>
      </section>
      <el-input
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = 'Eventi Country'"
        placeholder="Eventi Country"
        v-model="eventiToEdit.location.country"
        clearable
      />
      <el-input
        onblur="this.placeholder = 'Eventi Address'"
        onfocus="this.placeholder = ''"
        placeholder="Eventi Address"
        v-model="eventiToEdit.location.address"
        clearable
      />
      <div class="slect-options-inputs flex">
        <label>
          Limit of members
          <el-input-number
            v-model="eventiToEdit.capacity"
            :min="1"
          ></el-input-number>
        </label>
        <label>
          Select tags
          <select-multi
            v-model="eventiToEdit.tags"
            :items="tags"
          ></select-multi>
        </label>
        <label>
          Select neededs
          <select-multi
            v-model="eventiToEdit.neededs"
            :items="neededs"
          ></select-multi>
        </label>
        <el-button v-if="eventiToEdit._id" type="danger" @click="removeEventi"
          >Delete Event</el-button
        >
      </div>
      <el-button @click="saveEventi">Publish</el-button>
    </form>
  </section>
</template>

<script>
import { eventiService } from "../service/eventi-service.js";
import { orgService } from "../service/org-service.js";
import selectMulti from "../cmp/element-ui/select-multi.vue";
export default {
  name: "eventi-edit",
  data() {
    return {
      eventiToEdit: eventiService.getEmptyEventi(),
      byOrg: null,
      pickerOptions: {
        shortcuts: [
          {
            text: "Last week",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "Last month",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "Last 3 months",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
      dates: null,
      tags: this.$store.getters.tags,
      neededs: this.$store.getters.neededs,
    };
  },
  methods: {
    saveEventi() {
      if (!this.$store.getters.loggedinUser.org) {
        this.$message({
          showClose: true,
          message: `create organization first`,
          type: 'warning',
          duration: 1500
        })
        return
      }
      if (!this.eventiToEdit._id) {
        if (!this.eventiToEdit.imgUrls.length) {
          this.eventiToEdit.imgUrls.push(
            "https://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg",
            "https://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg",
            "https://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg"
          );
        }
        this.eventiToEdit.startAt = this.dates[0].getTime;
        this.eventiToEdit.endAt = this.dates[1].getTime;

        this.eventiToEdit.byOrg = this.byOrg;
      }
      const res = this.$store.dispatch({
        type: "saveEventi",
        eventi: this.eventiToEdit,
      });
      if (res.type) {
        this.$message({
          showClose: true,
          message: `${this.eventiToEdit.title} added sucessfully!`,
          type: "success",
          duration: 1500,
        });
      } else {
        this.$message({
          showClose: true,
          message: `${this.eventiToEdit.title} cant added, err ${res.err.code}`,
          type: "warning",
          duration: 1500,
        });
      }
      // eventiService.save(this.eventiToEdit);
      this.eventiToEdit = eventiService.getEmptyEventi();
      this.$router.go(-1);
    },
    async getEventiById() {
      if (!this.$route.params._id) return
      const eventiId = this.$route.params._id;
      if (eventiId) {
        this.eventiToEdit = await this.$store.dispatch({
          type: "getEventiById",
          _id: eventiId,
        });
      }
    },
    async getByOrg() {
      if (!this.$store.getters.loggedinUser.org) return
      const byOrgId = this.$store.getters.loggedinUser.org._id || { _id: null };
      if (byOrgId) {
        this.byOrg = await orgService.getById(byOrgId);
        const { _id, name, rate } = this.byOrg;
        this.byOrg = { _id, name, rate, imgUrl: this.byOrg.imgUrls[0] };

        console.log(
          "🚀 ~ file: eventi-edit.vue ~ line 146 ~ created ~ this.byOrg",
          this.byOrg
        );
      }
    },
    removeEventi() {
      this.$store.dispatch({
        type: "removeEventiById",
        eventiId: this.eventiToEdit._id,
      });
      this.$router.go(-2);
    },
  },
  created() {
    this.getEventiById();
    // this.eventiToEdit = this.$route.params._id;
    this.getByOrg();
  },
  components: {
    selectMulti,
  },
};
</script>

<style>
</style>