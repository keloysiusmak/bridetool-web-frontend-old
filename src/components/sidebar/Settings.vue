<template>
  <div id="sidebar_dashboard">
    <router-link to="/">back to home</router-link>
    <br/>
    <router-link to="/security/password">password</router-link>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { mappedStates } from '../config/vuex-config';

export default {
  name: 'Sidebar-Settings',
  computed: {
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
