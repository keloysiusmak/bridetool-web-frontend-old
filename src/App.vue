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
      'safelyStoredNumber',
      'change'
    ])
  },
  methods: {
    ...mapMutations([
      'increment',
      'increment2'
    ])
  },
  data() {
    return {
      errors: null
    }
  },
  async beforeCreate() {
    try {
      const getApiToken = await tokenHandler.getApiToken();
      localStorage.setItem('bridetoolApiToken', getApiToken.apiToken);
    } catch (e) {
      console.log(e);
      this.errors = JSON.stringify(e);
    };
  },
  async created() {
    console.log(this.safelyStoredNumber);
    console.log(this.change);
    const payload = {
      safelyStoredNumber: 6
    }
    this.increment(payload);
    const payload2 = {
      change: 1
    }
    this.increment2(payload2);
    console.log(this.safelyStoredNumber);
    console.log(this.change);
    if (!localStorage.getItem('bridetoolAccessToken')) {
      this.$router.push('/login');
    }
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
