<template>
  <div id="layout_app_clean">
    <router-view name="panel"/>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../config/vuex-config';

export default {
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  }
}
</script>

<style scoped>
</style>
