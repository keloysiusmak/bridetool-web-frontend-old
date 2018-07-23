<template>
  <div id="app">
    <router-view/>
    apiToken : {{ apiToken }}
    accessToken : {{ accessToken }}
    <br/>
    <router-link to="/home">
      home
    </router-link>
    <br/>
    Errors : {{ errors }}
  </div>
</template>

<script>
import axios from 'axios';
const handler = require('./handlers/handler');

const accountHandler = require('./handlers/accountHandler');
const scheduleHandler = require('./handlers/scheduleHandler');
const tokenHandler = require('./handlers/tokenHandler');

axios.defaults.baseURL = 'http://localhost:51051';

export default {
  name: 'App',
  data() {
    return {
      apiToken: '',
      accessToken: '',
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
      const accessToken = loginAccount.accessToken;
      this.accessToken = accessToken;
      accessToken.forEach((int) => {
        test
      });

      const getAllSchedules = await scheduleHandler.getCustomerSchedules(accessToken);
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
