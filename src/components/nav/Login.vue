<template>
  <div id="nav_login">
    Main Login Screen
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { mappedStates } from '../config/vuex-config';

export default {
  name: 'NavLogin',
  computed: {
    ...mapState(mappedStates)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
