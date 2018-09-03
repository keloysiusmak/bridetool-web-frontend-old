<template>
  <div id="layout_app_splash">
    <router-view name="navbar" />
    <div class="section">
      <div class="container">
        <router-view name="panel"/>
      </div>
    </div>
    <router-view name="footer"/>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../config/vuex-config';

export default {
  name: 'Layout-App-Splash',
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  }
}
</script>

<style scoped>
</style>
