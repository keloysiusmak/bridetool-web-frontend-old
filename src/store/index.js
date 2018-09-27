import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const persistedStateOptions = {
  paths: ['apiToken', 'accessToken', 'refreshToken', 'storedTokensTime', 'account', 'loggedInMember'],
  key: 'bridetoolPersistedState'
}

export const store = new Vuex.Store({
  plugins: [createPersistedState(persistedStateOptions)],
  state: {
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
        apiToken: state.apiToken,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        storedTokensTime: state.storedTokensTime
      }
    }
  },
  mutations: {
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
