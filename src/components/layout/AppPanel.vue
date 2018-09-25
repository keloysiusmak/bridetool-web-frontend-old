<template>
  <div id="layout_app_panel">
    <div class="columns is-gapless is-mobile">
      <div class="column is-2" style="position:fixed">
        <router-view name="sidebar" />
      </div>
      <div class="column is-10 is-offset-2">
        <div class="section">
          <router-view name="panel"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../config/vuex-config';

export default {
  name: 'Layout-App-Panel',
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  }
}
</script>

<style scoped>
</style>
