<template>
  <div id="nav_dashboard">
    Welcome, {{ account.firstName + " " + account.lastName }}
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { mappedStates } from '../config/vuex-config';

export default {
  name: 'Nav-Dashboard',
  computed: {
    ...mapState(mappedStates)
  },
  created() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
