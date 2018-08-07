<template>
  <div id="nav_default">
    <nav class="navbar subbar is-white" role="navigation" aria-label="main navigation">
      <div class="navbar-menu container">
        <div class="navbar-start">
          <router-link to="/settings/profile" class="navbar-item" v-bind:class="{ 'is-active': subbarSelected === 'profile' }">
            Profile
          </router-link>
          <router-link to="/settings/security" class="navbar-item" v-bind:class="{ 'is-active': subbarSelected === 'security' }">
            Security
          </router-link>
          <a v-on:click="logout()" class="navbar-item">
            Log Out
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../config/vuex-config';

export default {
  name: 'Nav-Default',
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  props: ['subbarSelected'],
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
  },
  created() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
