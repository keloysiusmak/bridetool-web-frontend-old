<template>
  <div id="sidebar_dashboard">
    <nav class="navbar sidebar is-white" role="navigation" aria-label="sub navigation">
      <div class="navbar-menu container">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/settings/email" v-bind:class="{ 'is-active': sidebarSelected === 'email' }">Email</router-link>
          <router-link class="navbar-item"  to="/settings/password" v-bind:class="{ 'is-active': sidebarSelected === 'password' }">Password</router-link>
          <router-link to="/welcome" class="navbar-item">Switch User</router-link>
        </div>
        <div class="navbar-end">
          <a class="navbar-item" v-on:click="logout()">
            <span class="button is-danger">Log Out</span>
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

export default {
  name: 'Sidebar-Settings',
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  props: ['sidebarSelected'],
  methods: {
    ...mapMutations([
      'setState'
    ]),
    logout: async function() {
      this.setState({
        accessToken: null,
        account: null,
        storedTokensTime: null,
        refreshToken: null,
        user: null
      });
      this.$router.push({ path: '/login' });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
