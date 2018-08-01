<template>
  <div id="layout_leftsidebar">
    <router-view name="navbar" />
    <br/>
    <hr/>
    <br/>
    <div class="container">
      <div style="display:inline-table; width:200px;">
        <router-view name="sidebar"/>
      </div>
      <div style="display:inline-table; width:590px;">
        <router-view name="panel"/>
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
