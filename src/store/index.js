import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const persistedStateOptions = {
  paths: ['safelyStoredNumber'],
  key: 'bridetoolPersistedState'
}

export const store = new Vuex.Store({
  plugins: [createPersistedState(persistedStateOptions)],
  state: {
    safelyStoredNumber: 0,
    change: 1
  },
  getters: {
    safelyStoredNumber: state => state.safelyStoredNumber,
    storedNumberMatches(state) {
      return matchNumber => {
          return state.safelyStoredNumber === matchNumber;
      }
    }
  },
  mutations: {
    increment(state, payload) {
      state.safelyStoredNumber = payload.safelyStoredNumber;
    },
    increment2(state, payload) {
      state.change += payload.change;
    }
  }
});
