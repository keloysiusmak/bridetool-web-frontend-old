import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const persistedStateOptions = {
  paths: ['apiToken', 'accessToken', 'account'],
  key: 'bridetoolPersistedState'
}

export const store = new Vuex.Store({
  plugins: [createPersistedState(persistedStateOptions)],
  state: {
    apiToken: null,
    accessToken: null,
    account: null,
    errors: null
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
