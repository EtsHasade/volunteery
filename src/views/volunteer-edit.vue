<template>
  <section class="volunteer-edit">
    <h3>volu edit</h3>
    <form class="flex column" @submit.prevent="addVolunteer">
      <input
        type="text"
        placeholder="Volunteer title"
        v-model="volunteerToEdit.title"
      />
      <textarea
        v-model="volunteerToEdit.desc"
        placeholder="tell us about your volunteer"
        name="desc"
        cols="20"
        rows="10"
      ></textarea>
      <!-- <label>
          Start date
          <input type="date" v-model="volunteerToEdit.startAt" range="5" placeholder="Start at">
        </label> -->
      <section class="dates">
        <div class="block">
          <span class="demonstration">Default</span>
          <el-date-picker
          lang="eng"
            v-model="dates"
            type="datetimerange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
          >
          </el-date-picker>
        </div>
      </section>
      <!-- <label>
          *End date
          <input type="date" v-model="volunteerToEdit.endAt" placeholder="End at">
        </label> -->
      <input
        type="text"
        v-model="volunteerToEdit.location.country"
        placeholder="Country"
      />
      <input
        type="text"
        v-model="volunteerToEdit.location.address"
        placeholder="Specific address"
      />
      <input
        type="number"
        v-model="volunteerToEdit.capacity"
        placeholder="Limit of members"
      />
      <label>
        Select tag
        <select v-model="volunteerToEdit.tags[0]">
          <option value="Fun">Fun</option>
          <option value="Animal">Animal</option>
          <option value="Food">Food</option>
        </select>
      </label>
        <!-- <el-select
          v-model="volunteerToEdit.tags"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> -->

      <select-multi v-model="volunteerToEdit.tags" :items="tags"></select-multi>
      <label>
        Select needed roles
        <select v-model="volunteerToEdit.neededs[0]">
          <option value="Doctor">Fun</option>
          <option value="Animal">Animal</option>
          <option value="Food">Food</option>
        </select>
      </label>
      <button>add</button>
    </form>
  </section>
</template>

<script>
import { volunteerService } from '../service/volunteer-service.js'
import selectMulti from '../cmp/element-ui/select-multi.vue'
export default {
  name: 'volunteer-edit',
  data() {
    return {
      volunteerToEdit: volunteerService.getEmptyVolunteer(),
      pickerOptions: {
        shortcuts: [{
          text: 'Last week',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: 'Last month',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: 'Last 3 months',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: '',
      dates: null,
      tags: this.$store.getters.tags
        //       options: [{
        //   value: 'Option1',
        //   label: 'Option1'
        // }, {
        //   value: 'Option2',
        //   label: 'Option2'
        // }, {
        //   value: 'Option3',
        //   label: 'Option3'
        // }, {
        //   value: 'Option4',
        //   label: 'Option4'
        // }, {
        //   value: 'Option5',
        //   label: 'Option5'
        // }],

    }
  },
  methods: {
    addVolunteer() {
      this.volunteerToEdit.startAt = this.dates[0].getTime
      this.volunteerToEdit.endAt = this.dates[1].getTime
      volunteerService.add(this.volunteerToEdit)
      this.volunteerToEdit = volunteerService.getEmptyVolunteer()
    }
  },
  created() {

  },
  components: {
    selectMulti
  }
}
</script>

<style>
</style>