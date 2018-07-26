<template>
  <div id="dashboard">
    <a v-on:click="logout()">Logout</a>
    <br/>
    <br/>
    {{ msg }}
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Dashboard',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App Home'
    }
  },
  methods: {
    ...mapMutations([
      'setTokens'
    ]),
    logout: async function() {
      this.setTokens({
        accessToken: null
      });
      this.$router.push({ path: '/login' });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
