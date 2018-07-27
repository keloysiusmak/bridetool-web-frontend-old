<template>
  <div id="main_dashboard">
    WELCOEM HOME
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { mappedStates } from '../config/vuex-config';

export default {
  name: 'MainDashboard',
  computed: {
    ...mapState(mappedStates)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
