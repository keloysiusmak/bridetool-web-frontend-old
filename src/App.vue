<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';
import { mappedStates } from './components/config/vuex-config';

const handler = require('./handlers/handler');
const scheduleHandler = require('./handlers/scheduleHandler');
const tokenHandler = require('./handlers/tokenHandler');

axios.defaults.baseURL = 'http://localhost:51051';

export default {
  name: 'App',
  computed: {
    ...mapState(mappedStates)
  },
  methods: {
    ...mapMutations([
      'setState'
    ])
  },
  async beforeCreate() {
    try {
      if (!this.apiToken) {
        const getApiToken = await tokenHandler.getApiToken();
        this.setState({
          apiToken: getApiToken.apiToken
        });
      }
    } catch (e) {
      this.setState({
        globalErrors: e.message
      })
    };
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width:800px;
  position:relative;
  margin-left:-400px;
  left:50%;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
