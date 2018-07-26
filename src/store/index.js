import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const persistedStateOptions = {
  paths: ['apiToken', 'accessToken'],
  key: 'bridetoolPersistedState'
}

export const store = new Vuex.Store({
  plugins: [createPersistedState(persistedStateOptions)],
  state: {
    apiToken: null,
    accessToken: null,
  },
  mutations: {
    setTokens(state, payload) {
      const payloadKeys = Object.keys(payload);


      if (payloadKeys.includes('accessToken')) {
        state.accessToken = payload.accessToken;
      }
      if (payloadKeys.includes('apiToken')) {
        state.apiToken = payload.apiToken;
      }
    }
  }
});
