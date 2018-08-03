<template>
  <div id="sidebar_dashboard">
    <aside class="menu">
      <p class="menu-label">Settings</p>
      <ul class="menu-list">
        <li><router-link to="/settings/email" v-bind:class="{ 'is-active': sidebarSelected === 'email' }">Email</router-link></li>
      </ul>
      <p>&nbsp;</p>
      <p class="menu-label">Security</p>
      <ul class="menu-list">
        <li><router-link to="/settings/password" v-bind:class="{ 'is-active': sidebarSelected === 'password' }">Password</router-link></li>
      </ul>
    </aside>

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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
