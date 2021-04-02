import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    users: [],
    loading: false,
    fetched: false,
  },
  actions: {
    async fetchUsers(ctx, url) {
      try {
        ctx.commit('resetUsers');
        ctx.commit('startLoading');
        const res = await axios.get(url);
        const users = await res.data;

        ctx.commit('loaded');
        ctx.commit('updateUsers', users);
      } catch (e) {
        console.log(e.message);
      }
    },
  },
  mutations: {
    updateUsers(state, users) {
      state.fetched = true;
      state.users = users;
    },
    resetUsers(state) {
      state.fetched = false;
      state.users = [];
    },
    addUser(state, payload) {
      state.users.unshift(payload);
    },
    startLoading(state) {
      state.loading = true;
    },
    loaded(state) {
      state.loading = false;
    },
  },
  getters: {
    allUsers(state) {
      return state.users;
    },
    getUser: (state) => (obj) => {
      return state.users.find(
        (user) => user.firstName === obj.name && +user.id === +obj.id
      );
    },
    loading: (state) => state.loading,
    fetched: (state) => state.fetched,
  },
});
