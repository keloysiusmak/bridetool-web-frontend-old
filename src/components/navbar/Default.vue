<template>
  <div id="sidebar_default">
    <nav class="navbar mainbar is-transparent" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <img src="../../assets/img/rocket.png" alt="Bulma: a modern CSS framework based on Flexbox" width="32" height="32">
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <router-link to="/schedule" class="navbar-item" v-bind:class="{ 'is-active': navbarSelected === 'weddingday' }">
            Wedding Day
          </router-link>
          <router-link to="/settings" class="navbar-item" v-bind:class="{ 'is-active': navbarSelected === 'settings' }">
            {{ activeParty.firstName + " " + activeParty.lastName }}
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
  name: 'Sidebar-Default',
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  props: ['navbarSelected'],
  methods: {
  },
  created() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
