<template>
  <div id="nav_default">
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <div v-if="activeParty" class="navbar-item">
          </div>
        </div>
        <div class="navbar-menu">
          <div class="navbar-start">
            <router-link class="navbar-item" to="/">
              <img src="../../assets/img/rocket.png" alt="Bulma: a modern CSS framework based on Flexbox" width="32" height="32">
            </router-link>
            <router-link to="/schedules" class="navbar-item" v-bind:class="{ 'is-active': navbarSelected === 'schedules' }">
              Schedules
            </router-link>
            <router-link to="/party" class="navbar-item" v-bind:class="{ 'is-active': navbarSelected === 'party' }">
              Wedding Party
            </router-link>
          </div>
          <div class="navbar-end">
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link" v-bind:class="{ 'is-active': navbarSelected === 'account' }">
                {{ activeParty.firstName + " " + activeParty.lastName }}
              </a>
              <div class="navbar-dropdown">
                <router-link to="/welcome" class="navbar-item">
                  Switch User
                </router-link>
                <router-link to="/settings" class="navbar-item">
                  Settings
                </router-link>
                <hr class="navbar-divider">
                <a v-on:click="logout()" class="navbar-item">
                  Log Out
                </a>
              </div>
            </div>
          </div>
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
  props: ['navbarSelected'],
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
