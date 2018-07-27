<template>
  <div id="layout">
    <router-view name="nav"/>
    <br/>
    Errors : {{ errors }}
    <br/>
    <hr/>
    <br/>
    <div style="display:inline-block; width:25%;">
      <router-view name="sidebar"/>
    </div>
    <div style="display:inline-block">
      <router-view name="main"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { mappedStates } from '../config/vuex-config';

export default {
  name: 'Layout',
  computed: {
    ...mapState(mappedStates)
  }
}
</script>

<style scoped>
</style>
