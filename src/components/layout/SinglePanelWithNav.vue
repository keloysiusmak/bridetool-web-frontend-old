<template>
  <div id="layout_leftsidebar">
    <router-view name="navbar" />
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <router-view name="panel"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../config/vuex-config';

export default {
  name: 'Layout-LeftSidebar',
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  }
}
</script>

<style scoped>
</style>
