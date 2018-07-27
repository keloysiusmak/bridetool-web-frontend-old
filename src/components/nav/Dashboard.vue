<template>
  <div id="nav_dashboard">
    Welcome, {{ account.firstName }}
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { mappedStates } from '../config/vuex-config';

export default {
  name: 'NavDashboard',
  computed: {
    ...mapState(mappedStates)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
