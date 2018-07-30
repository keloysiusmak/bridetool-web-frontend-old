<template>
  <div id="sidebar_dashboard">
    <router-link to="/">back to home</router-link>
    <br/>
    <router-link to="/settings/profile">profile</router-link>
    <br/>
    <router-link to="/settings/password">password</router-link>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../config/vuex-config';

export default {
  name: 'Sidebar-Settings',
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  methods: {
    ...mapMutations([
      'setState'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
