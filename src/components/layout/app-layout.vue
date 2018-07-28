<template>
  <div id="app_layout">
    <router-view name="nav"/>
    <br/>
    <hr/>
    <br/>
    <div style="display:inline-table; width:200px;">
      <router-view name="sidebar"/>
    </div>
    <div style="display:inline-table; width:590px;">
      <router-view name="main"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { mappedStates } from '../config/vuex-config';

export default {
  name: 'App-Layout',
  computed: {
    ...mapState(mappedStates)
  }
}
</script>

<style scoped>
</style>
