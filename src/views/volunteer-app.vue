<template>
  <main>
    <volunteer-filter></volunteer-filter>
    <volunteer-list :eventis="eventisToShow"></volunteer-list>
  </main>
</template>
 
<script>
import volunteerFilter from "@/cmp/volunteer-filter";
import volunteerList from "@/cmp/volunteer-list";

export default {
  name: "voluteerApp",
  computed: {
    eventisToShow() {
      return [
        {
          _id: "ev101",
          title: "Save africans kids",
          desc: "Lorem ipsum",
          byOrg: {
            _id: "u101",
            name: "Tno lahayot",
            rate: 3,
            imgUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOL98omSuYlHYNLuaAe8EyyHqd43-ksN3IMw&usqp=CAU",
          },
          startsAt: 12122212134,
          endAt: 12122251201,
          location: {
            lat: 35.42,
            lng: 34.22,
            country: "Israel",
            address: "13 Alenby, Tel-Aviv",
          },
          imgUrls: ["primary.jpg", "secondary1.jpg", "secondary2.jpg"],
          capacity: 100,
          tags: ["Fun", "animals"],
          neededs: [],
          members: [
            {
              _id: "u104",
              fullName: "Suki",
              imgUrl: "http://some-img",
            },
            {
              _id: "u101",
              fullName: "Puki Muki",
              imgUrl: "http://some-img",
            },
          ],
          reviews: [
            {
              _id: "r3243",
              createdAt: 12122134434,
              author: {
                _id: "u101",
                fullName: "Puki Muki",
                imgUrl: "http://some-img",
              },
              txt: "good event!",
              rate: 4,
            },
          ],
        },
      ];
    },
  },
  components: {
    volunteerFilter,
    volunteerList,
  },
};
</script>

<style>
</style>