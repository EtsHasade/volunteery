import Vue from 'vue'
import Vuex from 'vuex'
import {volunteerStore} from './module/volunteer-store.js'
import {orgStore} from './module/org-store.js'
import {userStore} from './module/user-store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    volunteerStore,
    userStore,
    orgStore
  }
})
