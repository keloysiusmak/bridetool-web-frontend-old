<template>
  <div id="sidebar_dashboard">
    wazzup! {{account.firstName}}
    <br/>
    <br/>
    <router-link to="/">home</router-link>
    <br/>
    <router-link to="/security">abc</router-link>
    <br/>
    <a v-on:click="logout()">Logout</a>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { mappedStates } from '../config/vuex-config';

export default {
  name: 'SidebarDashboard',
  computed: {
    ...mapState(mappedStates)
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    logout: async function() {
      this.setState({
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
