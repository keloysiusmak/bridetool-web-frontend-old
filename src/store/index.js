import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const persistedStateOptions = {
  paths: ['notifications', 'memberAccessToken', 'apiToken', 'accessToken', 'refreshToken', 'storedTokensTime', 'account', 'loggedInMember', 'schedule', 'members', 'budget'],
  key: 'bridetoolPersistedState'
}

export const store = new Vuex.Store({
  plugins: [createPersistedState(persistedStateOptions)],
  state: {
    notifications: [{'abc': 1}],
    memberAccessToken: null,
    apiToken: null,
    accessToken: null,
    refreshToken: null,
    storedTokensTime: null,
    account: null,
    loggedInMember: null,
    globalErrors: null,
    schedule: null,
    members: null,
    budget: null
  },
  getters: {
    tokens(state) {
      return {
        memberAccessToken: state.memberAccessToken,
        apiToken: state.apiToken,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        storedTokensTime: state.storedTokensTime
      }
    }
  },
  mutations: {
    clearState() {
      state: null
    },
    setState(state, payload) {
      const payloadKeys = Object.keys(payload);
      const stateKeys = Object.keys(state);

      payloadKeys.forEach(payloadKey => {
        if (stateKeys.includes(payloadKey)) {
          state[payloadKey] = payload[payloadKey];
        }
      });
    }
  }
});
