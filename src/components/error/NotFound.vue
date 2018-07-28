<template>
  <div id="layout">
    ERROR 404
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { mappedStates } from '../config/vuex-config';

export default {
  name: 'NotFound',
  computed: {
    ...mapState(mappedStates)
  }
}
</script>

<style scoped>
</style>
