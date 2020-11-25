<template>
  <section class="volunteer-edit">
    <h3>volu edit</h3>
    <form class="flex column" @submit.prevent="addVolunteer">
        <input type="text" placeholder="Volunteer title" v-model="volunteerToEdit.title" />
        <textarea v-model="volunteerToEdit.desc" placeholder="tell us about your volunteer" name="desc" cols="20" rows="10"></textarea>    
        <label>
          Start date
          <input type="date" v-model="volunteerToEdit.startAt" range="5" placeholder="Start at">
        </label>
        <label>
          *End date
          <input type="date" v-model="volunteerToEdit.endAt" placeholder="End at">
        </label>
        <input type="text" v-model="volunteerToEdit.location.country" placeholder="Country">
        <input type="text" v-model="volunteerToEdit.location.address" placeholder="Specific address">
        <input type="number" v-model="volunteerToEdit.capacity" placeholder="Limit of members">
        <label>
          Select tag
          <select v-model="volunteerToEdit.tags[0]">
            <option value="Fun">Fun</option>  
            <option value="Animal">Animal</option>  
            <option value="Food">Food</option>  
          </select>  
        </label>
        <label>
          Select needed roles
          <select v-model="volunteerToEdit.neededs[0]">
            <option value="Fun">Fun</option>  
            <option value="Animal">Animal</option>  
            <option value="Food">Food</option>  
          </select>  
        </label>

    </form>
  </section>
</template>

<script>
import {volunteerService} from '../service/volunteer-service.js'
export default {
  name: 'volunteer-edit',
  data() {
    return {
      volunteerToEdit: volunteerService.getEmptyVolunteer(),
    }
  },
  created() {

  }
}
</script>

<style>
</style>