<template>
  <div>
    <nav class="navbar mainbar is-transparent" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <img src="../../assets/img/rocket.png" alt="Bulma: a modern CSS framework based on Flexbox" width="32" height="32">
        </router-link>
        <a role="button" class="navbar-burger" v-on:click="toggleMenu()" aria-label="menu" aria-expanded="false" data-target="menu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" id="menu">
        <div class="navbar-end" v-if="activeMember">
          <router-link to="/schedule" class="navbar-item" v-bind:class="{ 'is-active': navbarSelected === 'planner' }">
            Planner
          </router-link>
          <router-link to="/settings" class="navbar-item" v-bind:class="{ 'is-active': navbarSelected === 'settings' }">
            Settings
          </router-link>
          <a v-on:click="logout()" class="navbar-item">
            Log Out
          </a>
        </div>
        <div class="navbar-end" v-if="!activeMember">
          <router-link to="/login" class="navbar-item" v-bind:class="{ 'is-active': navbarSelected === 'weddingday' }">
            Log In
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../config/vuex-config';

export default {
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  props: ['navbarSelected'],
  methods: {
    ...mapMutations([
      'setState'
    ]),
    toggleMenu: function() {
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    },
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
