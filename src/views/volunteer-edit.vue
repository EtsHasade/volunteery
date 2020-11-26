<template>
  <section
    class="volunteer-edit flex column center text-center small-container"
  >
    <h2>Create new volunteer</h2>
    <form class="flex column center" @submit.prevent="saveVolunteer">
      <el-input
        placeholder="Volunteer title"
        v-model="volunteerToEdit.title"
        clearable
      >
      </el-input>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="tell us about your volunteer"
        v-model="volunteerToEdit.desc"
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
        placeholder="Volunteer Country"
        v-model="volunteerToEdit.location.country"
        clearable
      />
      <el-input
        placeholder="Volunteer Address"
        v-model="volunteerToEdit.location.address"
        clearable
      />
      Limit of members
      <el-input-number
        v-model="volunteerToEdit.capacity"
        :min="1"
      ></el-input-number>
      <select-multi v-model="volunteerToEdit.tags" :items="tags"></select-multi>
      <select-multi
        v-model="volunteerToEdit.tags"
        :items="neededs"
      ></select-multi>
      <el-button @click="saveVolunteer">Save</el-button>
    </form>
  </section>
</template>

<script>
import { volunteerService } from "../service/volunteer-service.js";
import selectMulti from "../cmp/element-ui/select-multi.vue";
export default {
  name: "volunteer-edit",
  data() {
    return {
      volunteerToEdit: volunteerService.getEmptyVolunteer(),
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
    saveVolunteer() {
      console.log("hi");
          if (!this.volunteerToEdit._id){
            if (!this.volunteerToEdit.imgUrls.length)
              this.volunteerToEdit.imgUrls.push(
                "https://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg",
                "https://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg",
                "https://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg"
              );
            this.volunteerToEdit.startAt = this.dates[0].getTime;
            this.volunteerToEdit.endAt = this.dates[1].getTime;
          }

      volunteerService.save(this.volunteerToEdit);
      this.volunteerToEdit = volunteerService.getEmptyVolunteer();
      this.$router.push("/volunteer-app");
    },
    async getVolunteerById() {
      const volunteerId = this.$route.params._id;
      if (volunteerId) {
        this.volunteerToEdit = await this.$store.dispatch({
          type: "getVolunteerById",
          _id: volunteerId,
        });
      }
    },
  },
  created() {
    this.getVolunteerById();
    // this.volunteerToEdit = this.$route.params._id;
  },
  components: {
    selectMulti,
  },
};
</script>

<style>
</style>