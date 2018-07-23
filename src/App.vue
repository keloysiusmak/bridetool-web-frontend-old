<template>
  <div id="app">
    <router-view/>
    apiToken : {{ apiToken }}
    <br/>
    <br/>
    Errors : {{ errors }}
  </div>
</template>

<script>
import axios from 'axios';
const handler = require('./handlers/handler');

const accountHandler = require('./handlers/accountHandler');
const tokenHandler = require('./handlers/tokenHandler');

axios.defaults.baseURL = 'http://localhost:51051';

export default {
  name: 'App',
  data() {
    return {
      apiToken: '',
      errors: ''
    }
  },
  async created() {
    try {
      const apiToken = await tokenHandler.getApiToken();
      this.apiToken = apiToken;
      const username = 'hey';
      const password = 'heya';
      const loginAccount = await accountHandler.loginAccount(apiToken, username, password);
    } catch (e) {
      this.errors = e;
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
