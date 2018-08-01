<template>
  <div id="nav_dashboard">
    <div v-if="activeParty">
      Welcome, {{ activeParty.firstName + " " + activeParty.lastName }}
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../config/vuex-config';

export default {
  name: 'Nav-Dashboard',
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  created() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
