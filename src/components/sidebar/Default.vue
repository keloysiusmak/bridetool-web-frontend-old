<template>
  <div id="sidebar_dashboard">
    <router-link to="/">dashboard</router-link>
    <br/>
    <router-link to="/settings">settings</router-link>
    <br/>
    <a v-on:click="logout()">Logout</a>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { mappedStates } from '../config/vuex-config';

export default {
  name: 'Sidebar-Dashboard',
  computed: {
    ...mapState(mappedStates)
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    logout: async function() {
      this.setState({
        accessToken: null,
        account: null
      });
      this.$router.push({ path: '/login' });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
