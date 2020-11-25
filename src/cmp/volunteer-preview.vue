
<template>
  <li class="volunteer-preview flex-column">
    <img src="@/assets/img/650085_47717403.jpg" alt="" />
    <div class="org-details">
      <div class="flex">
        <img class="org-logo" :src="eventi.byOrg.imgUrl" alt="" />
        <h4>{{ eventi.byOrg.name }}</h4>
      </div>
      <h6>🟢🟢🟢⚪⚪</h6>
    </div>
    <div class="eventi-label">
      <h3>{{ eventi.title }}</h3>
      <div class="eventi-date flex">
        <h6>{{ new Date(eventi.startsAt).toLocaleDateString() }} |</h6>
        <h6>{{ eventi.location.country }}</h6>
      </div>
    </div>
    <div class="eventi-floor">
      <h4>{{eventi.members.length}}/{{eventi.capacity}} 👨‍👨‍👦</h4>
    </div>
  </li>
</template>

<script>
export default {
  name: "volunteerPreview",
  props: {
    eventi: Object,
  },
};
</script>

<style>
</style>