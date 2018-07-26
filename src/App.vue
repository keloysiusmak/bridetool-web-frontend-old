<template>
  <div id="app">
    <router-view name="main"/>
    <br/>
    Errors : {{ errors }}
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations, mapGetters } from 'vuex';

const handler = require('./handlers/handler');
const scheduleHandler = require('./handlers/scheduleHandler');
const tokenHandler = require('./handlers/tokenHandler');

axios.defaults.baseURL = 'http://localhost:51051';

export default {
  name: 'App',
  computed: {
    ...mapState([
      'apiToken',
      'accessToken'
    ])
  },
  methods: {
    ...mapMutations([
      'setTokens'
    ])
  },
  data() {
    return {
      errors: null
    }
  },
  async created() {
    try {
      if (!this.apiToken) {
        const getApiToken = await tokenHandler.getApiToken();
        this.setTokens({
          apiToken: getApiToken.apiToken
        });
      }

      if (!this.accessToken) {
        this.$router.push('/login');
      }
    } catch (e) {
      console.log(e);
      this.errors = JSON.stringify(e);
    };
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
