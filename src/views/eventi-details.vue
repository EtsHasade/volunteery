<template>
  <section v-if="eventi" class="eventi-details">
    <section class="main-details">
      <section class="top-page flex center space-between">
        <div class="top-details">
          <h2 class="mb10">{{ eventi.title }}</h2>
          <span v-if="eventi.reviews.length">
            <i class="star fas fa-star"></i>
            {{ eventi.rate }} ({{ eventi.reviews.length }}reviews)
          </span>
          <span v-else><i class="star fas fa-star"></i>New</span> |
          <span
            >{{ eventi.location.address }}, {{ eventi.location.country }}</span
          >
        </div>
        <div v-if="isUserOrgAdmin" class="edit-btns flex">
          <el-button class="delete-btn" type="warning" @click="removeEventi"
            >Delete Event</el-button
          >
          <router-link
            type="success"
            class="el-button el-button--success"
            :to="'/eventi-edit/' + eventi._id"
            >Edit</router-link
          >
        </div>
      </section>
      <section class="eventi-imgs">
        <img
          class="eventi-img"
          v-for="(img, idx) in eventi.imgUrls"
          :key="idx"
          :src="img"
        />
      </section>
    </section>
    <section class="mini-org flex align-center" @click="openOrgDetails">
      <avatar
        class="mr16 hover-pointer"
        :src="eventi.byOrg.imgUrl"
        :username="eventi.byOrg.name"
      />
      <span>{{ eventi.byOrg.name }}</span>
    </section>
    <main class="flex justify-center">
      <section class="details flex column">
        <section class="details-ev">
          <hr />
          <section class="tags flex wrap align-center">
            <span>Tags:</span>
            <span
              class="tag text-center mrg5"
              v-for="(tag, idx) in eventi.tags"
              :key="idx"
              ><i :class="tagsIcon[tag]"></i> {{ tag }}
            </span>
          </section>
          <hr />
          <section class="tags-section flex align-center wrap">
            <span
              ><i class="fas fa-users"></i> {{ eventi.members.length }} /
              {{ eventi.capacity }} members</span
            >
            <hr />
            <section class="dates flex column">
              <span
                ><i class="fas fa-calendar-alt"></i>
                {{ moment(eventi.startAt).format("DD/MM/YYYY") }} -
                {{ moment(eventi.endAt).format("DD/MM/YYYY") }}</span
              >
            </section>
            <section class="neededs">
              <span class="need-txt">We need for this eventi:</span>
              <section class="needed-content clean-list flex wrap column">
                <span
                  class="needed text-center mrg5"
                  v-for="(needed, idx) in eventi.neededs"
                  :key="idx"
                >
                  <i :class="neededsIcon[needed]"></i> {{ needed }}
                </span>
              </section>
            </section>
          </section>
          <hr />
        </section>
        <section class="desc-ev">
          <span>{{ eventi.desc }}</span>
        </section>
      </section>
      <section class="status-details text-center flex column center">
        <div class="join-section flex column align-center">
          <p>We need speicals volunteer, if you are please join us!</p>
          <el-button type="success" class="join-btn" @click="addMember">{{
            textBtn
          }}</el-button>
        </div>
        <section class="share-button flex center">
          <section>
            <!-- <a href="https://api.whatsapp.com/send?phone=972501122337&text=http://localhost:8080/#/eventi-details/5fc3c2f8b939f9e519ca2794"
              target="_blank"><i class="fab fa-whatsapp"></i></a> -->
          <a href="https://api.whatsapp.com/send?text=http://localhost:8080/#/eventi-details/5fc3c2f8b939f9e519ca2794" 
          target="_blank"><i class="fab fa-whatsapp"></i></a>
          </section>
          <section
            class="fb-share-button"
            data-href="https://www.facebook.com/HeroesforLifeIsrael"
            data-layout="button"
            data-size="large">
            <a
              target="_blank"
              href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2F%23%2Feventi-details%2F5fc3c2f8b939f9e519ca2794&amp;src=sdkpreparse"
              class="fb-xfbml-parse-ignore"><i class="fab fa-facebook"></i></a>
          </section>
        </section>
        <section class="section-status-details">
          <section class="members flex column text-center align-center">
            <h3 class="title-members">Members</h3>
            <section class="members-imgs flex center wrap">
              <avatar
                style="background-position: center; background-size: cover"
                class="member-img mrg5"
                v-for="member in eventi.members"
                :key="member._id"
                :username="member.fullName"
                :src="member.imgUrl"
                :title="member.fullName"
              />
            </section>
          </section>
          <chat-app class="chat-app">
            <h3 class="title-chat" slot="header">Event Chat</h3>
            <section v-for="(msg, idx) in msgs" class="mainChat" :key="idx">
              <span class="msg">{{ msg.from }}: {{ msg.txt }}</span>
            </section>
            <div slot="footer">
              <form @submit.prevent="sendMsg" class="flex align-center">
                <el-input placeholder="Send Massage" v-model="msgChat.txt" />
                <i
                  class="far fa-paper-plane fa-2x hover-pointer"
                  @click="sendMsg"
                ></i>
              </form>
            </div>
          </chat-app>
        </section>
      </section>
    </main>
    <section class="reviews-section flex column center">
      <section class="add-review flex align-center text-center mb10">
        <el-input type="text" v-model="reviewToEdit.txt" name="review" />
        <el-button type="success" @click="addReview">Add review</el-button>
        <rate-stars-enable class="mb10" v-model="reviewToEdit.rate" />
      </section>
      <span class="text-center mrg5">Reviews</span>
      <section class="reviews flex wrap align-center">
        <section
          class="review flex column mrg5"
          v-for="review in eventi.reviews"
          :key="review._id"
        >
          <section class="details-review flex align-center">
            <avatar
              :src="review.author.imgUrl"
              :username="review.author.fullName"
            ></avatar>
            <!-- <rate-stars v-model="review.rate" class="review-rate" /> -->
            <span class="review-rate"
              >{{ review.rate }}<i class="star fas fa-star"></i
            ></span>
            <span class="time mrg5">
              {{ moment(review.createdAt).startOf("minute").fromNow() }}
            </span>
          </section>
          <section class="content-review flex align-center text-center">
            <span class="name-review mrg5">{{ review.author.fullName }}: </span>
            <span class="txt-review">{{ review.txt }}</span>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import chatApp from "../cmp/chat-app";
import socketService from "../service/socket-service.js";
import { eventiService } from "../service/eventi-service.js";
// import { userService } from '../service/user-service.js';
import avatar from "vue-avatar";
// import rateStars from '../cmp/element-ui/rate-stars';
import rateStarsEnable from "../cmp/element-ui/rate-stars-enable";
var moment = require("moment");
export default {
  name: "eventi-details",
  data() {
    return {
      moment,
      eventi: null,
      reviewToEdit: { author: {}, txt: "", rate: 5 },
      miniLoggedinUser: null,
      miniEventi: null,
      textBtn: "Join us!",
      msg: "no Rates",
      msgChat: { from: "", txt: "" },
      msgs: [],
      topic: "love",
      // showChat: false,
      debounce: null,
    };
  },
  computed: {
    tagsIcon() {
      return this.$store.getters.tagsIcon;
    },
    neededsIcon() {
      return this.$store.getters.neededsIcon;
    },
    isUserOrgAdmin() {
      const loggedinUser = this.$store.getters.loggedinUser;
      console.log(
        "🚀 ~ file: eventi-details.vue ~ line 139 ~ isUserOrgAdmin ~ loggedinUser",
        loggedinUser
      );
      if (loggedinUser && loggedinUser.isAdmin) return true; // not secured!!
      if (
        !loggedinUser ||
        !loggedinUser.org ||
        loggedinUser.org._id !== this.eventi.byOrg._id
      )
        return false;
      else return true;
    },
  },
  methods: {
    avgRates() {
      if (this.eventi.reviews.length === 1) {
        this.eventi.rate = this.eventi.reviews[0].rate;
      }
      var sum = 0;
      this.eventi.reviews.forEach((review) => {
        sum += review.rate;
      });
      this.eventi.rate = (sum / this.eventi.reviews.length).toFixed(2);

      // return sum / this.eventi.reviews.length
    },
    async addMember() {
      const idx = this.eventi.members.findIndex((member) => {
        return member._id === this.miniLoggedinUser._id;
      });
      if (idx != -1) {
        this.eventi.members.splice(idx, 1);
        const idxEvent = this.$store.getters.loggedinUser.events.findIndex(
          (event) => {
            return event._id === this.eventi._id;
          }
        );
        const user = this.$store.getters.loggedinUser;
        user.events.splice(idxEvent, 1);
        this.$store.dispatch({
          type: "updateUser",
          user: JSON.parse(JSON.stringify(user)),
        });
        const res = await this.$store.dispatch({
          type: "saveEventi",
          eventi: JSON.parse(JSON.stringify(this.eventi)),
        });
        if (res.type) {
          this.textBtn = "Join us";
          this.$message({
            showClose: true,
            message: `You remove from this event`,
            type: "success",
            duration: 1500,
          });
        }
        return;
      }
      const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser));
      this.eventi.members.push(this.miniLoggedinUser);
      // eventiService.save(JSON.parse(JSON.stringify(this.eventi)))
      this.$store.dispatch({
        type: "saveEventi",
        eventi: JSON.parse(JSON.stringify(this.eventi)),
      });
      user.events.push(JSON.parse(JSON.stringify(this.miniEventi)));
      const res = await this.$store.dispatch({
        type: "updateUser",
        user,
      });
      if (res.type) {
        this.$message({
          showClose: true,
          message: `You are a member!`,
          type: "success",
          duration: 1500,
        });
      }
      this.textBtn = "leave event";
    },
    addReview() {
      this.reviewToEdit.rate = Number(this.reviewToEdit.rate);
      this.reviewToEdit.createdAt = Date.now();
      this.reviewToEdit._id = eventiService.makeId();
      this.reviewToEdit.author = JSON.parse(
        JSON.stringify(this.miniLoggedinUser)
      ) || { fullName: "Goust" };
      this.eventi.reviews.push(this.reviewToEdit);
      this.avgRates();
      this.$store.dispatch({
        type: "saveEventi",
        eventi: JSON.parse(JSON.stringify(this.eventi)),
      });
      // eventiService.save(JSON.parse(JSON.stringify(this.eventi)))
      this.$message({
        showClose: true,
        message: `Your review added sucessfully!`,
        type: "success",
        duration: 1500,
      });

      this.reviewToEdit = { author: {}, txt: "", rate: 5 };
    },
    async removeEventi() {
      const res = await this.$store.dispatch({
        type: "removeEventiById",
        eventiId: this.eventi._id,
      });
      if (res.type) {
        this.$message({
          showClose: true,
          message: `${this.eventi.title} removed sucessfully!`,
          type: "success",
          duration: 1500,
        });
      } else {
        this.$message({
          showClose: true,
          message: `${this.eventi.title} cant remove, err ${res.err.code}`,
          type: "warning",
          duration: 1500,
        });
      }
      this.$router.go(-1);
    },
    // closeChat() {
    //   this.showChat = false;
    //   this.msgs = [];
    //   this.msgChat = "";
    //   socketService.off('chat addMsg', this.addMsg)
    //   socketService.terminate();
    // },
    // openChat() {
    //   if (!this.$store.getters.loggedinUser) return
    //   this.showChat = true;
    //   this.msgChat.from = this.$store.getters.loggedinUser.fullName
    //   this.topic = this.eventi._id
    //   socketService.setup();
    //   socketService.emit('chat topic', this.topic)
    //   socketService.on('chat addMsg', this.addMsg)
    // },
    addMsg(msgChat) {
      this.msgs.push(msgChat);
    },
    sendMsg() {
      if (!this.$store.getters.loggedinUser) return;
      this.msgChat.from = this.$store.getters.loggedinUser.fullName;
      console.log("Sending", this.msgChat);
      socketService.emit("chat newMsg", this.msgChat);
      this.msgChat = {
        from: this.$store.getters.loggedinUser.fullName,
        txt: "",
      };
    },
    openOrgDetails() {
      this.$router.push(`/org-details/${this.eventi.byOrg._id}`);
    },
  },
  async created() {
    const id = this.$route.params.eventiId;
    const eventi = await eventiService.getById(id);
    this.eventi = JSON.parse(JSON.stringify(eventi));
    this.miniEventi = {
      _id: eventi._id,
      title: eventi.title,
      imgUrl: eventi.imgUrls[0],
    };
    const user = JSON.parse(
      JSON.stringify(this.$store.getters.loggedinUser)
    ) || { fullName: "Goust" };
    const { _id, fullName, imgUrl } = user;
    this.miniLoggedinUser = { _id, fullName, imgUrl };
    this.avgRates();
    if (
      this.eventi.members.find(
        (member) => member._id === this.miniLoggedinUser._id
      )
    ) {
      this.textBtn = "leave event";
    }

    // this.msgChat.from = (this.$store.getters.loggedinUser)? this.$store.getters.loggedinUser.fullName : 'Goust';
    this.topic = this.eventi._id;
    socketService.setup();
    socketService.emit("chat topic", this.topic);
    socketService.on("chat addMsg", this.addMsg);
  },
  destroyed() {
    this.msgs = [];
    this.msgChat = "";
    socketService.off("chat addMsg", this.addMsg);
    socketService.terminate();
  },
  components: {
    avatar,
    // rateStars,
    rateStarsEnable,
    chatApp,
  },
};
</script>

<style>
</style>